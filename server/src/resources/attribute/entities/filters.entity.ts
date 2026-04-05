import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AttributeInFilters } from './attribute.entity'

@ObjectType()
export class Filters {
	@Field(() => [AttributeInFilters])
	attributes: AttributeInFilters[]

	@Field(() => Int)
	minPrice: number

	@Field(() => Int)
	maxPrice: number

	@Field(() => Int)
	minTerm: number

	@Field(() => Int)
	maxTerm: number
}
