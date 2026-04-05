import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class PaginationInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Page must be a string.' })
	readonly page?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Per Page must be a string.' })
	readonly perPage?: string
}
