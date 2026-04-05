import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Property, PropertyInFilter } from './property.entity'

@ObjectType()
export class Attribute {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => [Property])
	properties: Property[]

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class FilterAttribute {
	@Field(() => String)
	name: string
}

@ObjectType()
export class AllAttributes {
	@Field(() => [Attribute])
	attributes: Attribute[]

	@Field(() => Int)
	count: number
}

@ObjectType()
export class AttributeInFilters {
	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => [PropertyInFilter])
	properties: PropertyInFilter[]
}
