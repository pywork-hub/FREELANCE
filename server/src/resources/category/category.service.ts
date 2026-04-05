import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Visibility } from 'src/global/enums/query.enum'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryCategoryFilters } from 'src/utils/query/query-category-filters.util'
import { PaginationService } from '../pagination/pagination.service'
import { categoryInclude } from './includes/category.include'
import { CategoryQueryInput } from './inputs/category-query.input'
import { CategoryInput } from './inputs/category.input'
import { catalogCategorynestedSeoSelect } from './selects/category-seo.select'
import { catalogCategorySelect } from './selects/category.select'

@Injectable()
export class CategoryService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: CategoryQueryInput, query?: object) {
		const { createFilter, getSortFilter } = queryCategoryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		let filters = createFilter(input)

		if (query) {
			filters = {
				AND: [filters, query],
			}
		}

		const categories = await this.prisma.category.findMany({
			where: filters,
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			select: catalogCategorySelect,
		})

		const count = await this.prisma.category.count({
			where: filters,
		})

		return {
			categories: categories || [],
			count: count || 0,
		}
	}

	async getSeo(slug: string) {
		return this.prisma.category.findUnique({
			where: {
				slug,
			},
			select: catalogCategorynestedSeoSelect,
		})
	}

	// Admin Place
	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id,
			},
			include: categoryInclude,
		})

		if (!category) throw new NotFoundException('Категория не найдена.')

		return category
	}

	async toggleVisibility(id: number) {
		const category = await this.byId(id)

		return this.prisma.category.update({
			where: {
				id,
			},
			data: {
				visibility:
					category.visibility === Visibility.VISIBLE
						? Visibility.HIDDEN
						: Visibility.VISIBLE,
			},
		})
	}

	async duplicate(id: number) {
		const category = await this.byId(id)
		const name = await this.generateUniqueSlug(category.name)

		return this.prisma.category.create({
			data: {
				name: name,
				slug: generateSlug(name),
				coverPath: category.coverPath,
				parents:
					category.parents.length > 0
						? {
								connect: category.parents.map((parent) => ({ id: parent.id })),
							}
						: undefined,
				seo: category.seo
					? {
							create: {
								title: category.seo.title,
								description: category.seo.description,
								keywords: category.seo.keywords,
								graphs: category.seo.graphs
									? {
											create: {
												title: category.seo.graphs.title,
												description: category.seo.graphs.description,
												images:
													category.seo.graphs.images.length > 0
														? {
																create: category.seo.graphs.images.map(
																	(image) => ({
																		url: image.url,
																		alt: image.alt,
																	})
																),
															}
														: undefined,
											},
										}
									: undefined,
							},
						}
					: undefined,
				block: category.block
					? {
							create: {
								heading: category.block.heading,
								items: {
									create: category.block.items.map((item) => ({
										heading: item.heading,
										content: item.content,
									})),
								},
							},
						}
					: undefined,
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.category.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Категория уже существует.')

		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
				coverPath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: CategoryInput) {
		const category = await this.byId(id)

		const isExists = await this.prisma.category.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: category.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Категория уже существует.')

		return this.prisma.category.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				coverPath: input.coverPath,
				parents:
					input.parents.length > 0
						? {
								disconnect: category.parents.map((parent) => ({
									id: parent.id,
								})),
								connect: input.parents.map((parent) => ({ id: parent.value })),
							}
						: undefined,
				seo: {
					delete: category.seo ? true : false,
					create: input.seo
						? {
								title: input.seo.title,
								description: input.seo.description,
								keywords: input.seo.keywords.map((keyword) => keyword.value),
								graphs: input.seo.graphs
									? {
											create: {
												title: input.seo.graphs.title,
												description: input.seo.graphs.description,
												images: input.seo.graphs.images.length > 0 ? {
													create: input.seo.graphs.images.map((image) => ({
														url: image.url,
														alt: image.alt,
													})),
												} : undefined,
											},
										}
									: undefined,
							}
						: undefined,
				},
				block: {
					delete: category.block ? true : false,
					create: input.block && input.block.items.length > 0 ? {
						heading: input.block.heading,
						items: {
							create: input.block.items.map((item) => ({
								heading: item.heading,
								content: item.content,
							})),
						},
					} : undefined,
				},
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id,
			},
		})
	}

	private generateUniqueSlug = async (queriedName: string, number = 1) => {
		const name = `${queriedName}-${number}`
		const isExist = await this.prisma.category.findUnique({
			where: {
				slug: generateSlug(name),
			},
		})

		if (!isExist) {
			return name
		} else {
			return this.generateUniqueSlug(queriedName, number + 1)
		}
	}
}
