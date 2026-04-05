import { Field, ObjectType } from '@nestjs/graphql'
import { Filters } from 'src/resources/attribute/entities/filters.entity'
import { Block } from 'src/resources/block/entities/block.entity'
import { CatalogCategory } from 'src/resources/category/entities/category.entity'
import { Seo } from 'src/resources/seo/entities/seo.entity'

@ObjectType()
export class Catalog {
	@Field(() => [CatalogCategory])
	categories: CatalogCategory[]

	@Field(() => Filters, { nullable: true })
	filters?: Filters

	@Field(() => String, { nullable: true })
	categoryName?: string | null

	@Field(() => Block, { nullable: true })
	block?: Block | null

	@Field(() => Seo, { nullable: true })
	seo?: Seo | null
}
