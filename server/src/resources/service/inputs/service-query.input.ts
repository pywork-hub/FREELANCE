import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsOptional, IsString } from 'class-validator'
import { Sort } from 'src/global/enums/query.enum'
import { QueryFullestInput } from 'src/global/inputs/query.input'

@InputType()
export class ServiceQueryInput extends QueryFullestInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Order Times must be a string.' })
	orderTimes?: Sort

	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray({ message: 'Properties must be an array.' })
	properties?: string[]

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Min Price must be a string.' })
	minPrice?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Max Price must be a string.' })
	maxPrice?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Min Term must be a string.' })
	minTerm?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Max Term must be a string.' })
	maxTerm?: string
}
