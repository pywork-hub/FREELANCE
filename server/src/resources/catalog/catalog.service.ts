import { Injectable } from '@nestjs/common'
import { AttributeService } from '../attribute/attribute.service'
import { CategoryService } from '../category/category.service'
import { PageType } from '../page/enums/page-type.enum'
import { PageService } from '../page/page.service'
import { CatalogService as CatalogServiceEntity } from '../service/entities/service.entity'
import { ServiceService } from '../service/service.service'
import { Catalog } from './entities/catalog.entity'
import { CatalogInput } from './inputs/catalog.input'

@Injectable()
export class CatalogService {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly serviceService: ServiceService,
		private readonly attributeService: AttributeService,
		private readonly pageService: PageService
	) {}

	async getCatalog({
		categorySlug,
		categoryInput,
		serviceInput,
	}: CatalogInput) {
		let categories
		let category = null
		let block = null
		let seo = null

		if (categorySlug) {
			category = await this.categoryService.getSeo(categorySlug)
			seo = category.seo
			block = category.block
			const { categories: fetchedCategories } =
				await this.categoryService.getAll(categoryInput, {
					parents: {
						some: {
							slug: categorySlug,
						},
					},
				})
			categories = fetchedCategories || []
		} else {
			const { categories: fetchedCategories } =
				await this.categoryService.getAll(categoryInput)
			categories = fetchedCategories || []
			block = await this.pageService.getPageBlock(PageType.MARKET)
			seo = await this.pageService.getPageSeo(PageType.MARKET)
		}

		const { services } = await this.serviceService.getAllForFilters(
			serviceInput,
			{
				categories: categorySlug ? { some: { slug: categorySlug } } : undefined,
			}
		)

		const attributes = await this.attributeService.getFilters(
			services as CatalogServiceEntity[]
		)

		const prices = services.map((service) =>
			service.fromSalePrice ? service.fromSalePrice : service.fromPrice
		)
		const terms = services.map((service) => service.fromTerm)

		let minPrice: number = 0,
			maxPrice: number = 0,
			minTerm: number = 0,
			maxTerm: number = 0

		if (prices.length > 0) {
			maxPrice = Math.max(...prices)
			minPrice = Math.min(...prices)
		}
		if (terms.length > 0) {
			maxTerm = Math.max(...terms)
			minTerm = Math.min(...terms)
		}

		const secondsInDay = 86400
		const roundDownToFullDay = (seconds: number) =>
			Math.floor(seconds / secondsInDay)
		const roundUpToFullDay = (seconds: number) =>
			Math.ceil(seconds / secondsInDay)

		return {
			categories: categories || [],
			categoryName: category ? category.name : null,
			filters: {
				attributes: attributes || [],
				minPrice: minPrice || 0,
				maxPrice: maxPrice || 0,
				minTerm: minTerm > 0 ? roundDownToFullDay(minTerm) : 0,
				maxTerm: maxTerm > 0 ? roundUpToFullDay(maxTerm) : 0,
			},
			block,
			seo,
		} as Catalog
	}
}
