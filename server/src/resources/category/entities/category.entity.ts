import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Visibility } from 'src/global/enums/query.enum'
import { Block } from 'src/resources/block/entities/block.entity'
import { Seo } from 'src/resources/seo/entities/seo.entity'
import { Service } from 'src/resources/service/entities/service.entity'

@ObjectType()
export class Category {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	coverPath: string

	@Field(() => [Category])
	childrens: Category[]

	@Field(() => [Category])
	parents: Category[]

	@Field(() => [Service])
	services: Service[]

	@Field(() => Seo, { nullable: true })
	seo?: Seo

	@Field(() => Block, { nullable: true })
	block?: Block

	@Field(() => Int)
	orderTimes: number

	@Field(() => Visibility)
	visibility: Visibility

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class SessionCategory {
	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string
}

@ObjectType()
export class CatalogCategory {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	coverPath: string

	@Field(() => Visibility)
	visibility: Visibility
}

@ObjectType()
export class AllCategories {
	@Field(() => [CatalogCategory])
	categories: CatalogCategory[]

	@Field(() => Int)
	count: number
}
