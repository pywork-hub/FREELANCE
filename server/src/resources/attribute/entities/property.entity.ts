import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Service } from 'src/resources/service/entities/service.entity'
import { Attribute, FilterAttribute } from './attribute.entity'

@ObjectType()
export class Property {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => [Service])
	services: Service[]

	@Field(() => Attribute)
	attribute: Attribute

	@Field(() => Int)
	attributeId: number

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class FilterProperty {
	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => FilterAttribute)
	attribute: FilterAttribute

	@Field(() => Int)
	attributeId: number
}

@ObjectType()
export class PropertyInFilter {
	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string
}
