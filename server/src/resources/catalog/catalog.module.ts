import { Module } from '@nestjs/common'
import { AttributeService } from '../attribute/attribute.service'
import { CategoryService } from '../category/category.service'
import { PageService } from '../page/page.service'
import { ServiceService } from '../service/service.service'
import { CatalogResolver } from './catalog.resolver'
import { CatalogService } from './catalog.service'

@Module({
	providers: [
		CatalogResolver,
		CatalogService,
		CategoryService,
		PageService,
		ServiceService,
		AttributeService,
	],
})
export class CatalogModule {}
