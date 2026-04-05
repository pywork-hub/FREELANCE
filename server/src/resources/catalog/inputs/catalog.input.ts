import { Field, InputType } from '@nestjs/graphql'
import { CategoryQueryInput } from 'src/resources/category/inputs/category-query.input'
import { ServiceQueryInput } from 'src/resources/service/inputs/service-query.input'

@InputType()
export class CatalogInput {
	@Field(() => String, { nullable: true })
	categorySlug?: string

	@Field(() => CategoryQueryInput)
	categoryInput: CategoryQueryInput

	@Field(() => ServiceQueryInput)
	serviceInput: ServiceQueryInput
}
