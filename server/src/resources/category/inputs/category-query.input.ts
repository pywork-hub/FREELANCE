import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { QueryFullestInput } from 'src/global/inputs/query.input'

@InputType()
export class CategoryQueryInput extends QueryFullestInput {
	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	@IsBoolean({ message: 'Is Parents must be a boolean.' })
	isParents?: boolean

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Parent Slug must be a string.' })
	parentSlug?: string
}
