import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Visibility } from 'src/global/enums/query.enum'
import {
	FilterProperty,
	Property,
} from 'src/resources/attribute/entities/property.entity'
import {
	Category,
	SessionCategory,
} from 'src/resources/category/entities/category.entity'
import { Example } from 'src/resources/example/entities/example.entity'
import { Review } from 'src/resources/review/entities/review.entity'
import { Seo } from 'src/resources/seo/entities/seo.entity'
import { User } from 'src/resources/user/entities/full/user.entity'

@ObjectType()
export class Service {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => Int)
	fromPrice: number

	@Field(() => Int, { nullable: true })
	fromSalePrice?: number

	@Field(() => Int)
	fromTerm: number

	@Field(() => String)
	excerpt: string

	@Field(() => String)
	description: string

	@Field(() => String)
	coverPath: string

	@Field(() => String)
	videoPath: string

	@Field(() => [Example])
	examples: Example[]

	@Field(() => [Category])
	categories: Category[]

	@Field(() => [Property])
	properties: Property[]

	@Field(() => [User])
	favoriteUsers: User[]

	@Field(() => [User])
	cartUsers: User[]

	@Field(() => [Review])
	reviews: Review[]

	@Field(() => Seo, { nullable: true })
	seo?: Seo | null

	@Field(() => Int)
	orderTimes: number

	@Field(() => Float)
	averageRating: number

	@Field(() => Visibility)
	visibility: Visibility

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class CatalogService {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => Int)
	fromPrice: number

	@Field(() => Int, { nullable: true })
	fromSalePrice?: number

	@Field(() => Int)
	fromTerm: number

	@Field(() => String)
	excerpt: string

	@Field(() => String)
	coverPath: string

	@Field(() => String)
	videoPath: string

	@Field(() => [FilterProperty])
	properties: FilterProperty[]

	@Field(() => [SessionCategory])
	categories: SessionCategory[]

	@Field(() => [Review])
	reviews: Review[]

	@Field(() => Float)
	averageRating: number

	@Field(() => Visibility)
	visibility: Visibility
}

@ObjectType()
export class FavoriteService {
	@Field(() => String)
	slug: string
}

@ObjectType()
export class CurrentService {
	@Field(() => Service, { nullable: true })
	service: Service

	@Field(() => [CatalogService])
	similarServices: CatalogService[]

	@Field(() => Int)
	reviewsCount: number
}

@ObjectType()
export class AllServices {
	@Field(() => [CatalogService])
	services: CatalogService[]

	@Field(() => Int)
	count: number
}
