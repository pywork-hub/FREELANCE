import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Sort, Visibility } from 'src/global/enums/query.enum'
import { PaginationInput } from 'src/resources/pagination/input/pagination.input'

@InputType()
export class QueryFullestInput extends PaginationInput {
	@Field(() => Sort)
	@IsString({ message: 'Sort must be a string.' })
	@IsNotEmpty({ message: 'Sort is required.' })
	sort: Sort

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Search Term must be a string.' })
	searchTerm?: string

	@Field(() => Visibility)
	@IsString({ message: 'Visibility must be a string.' })
	@IsNotEmpty({ message: 'Visibility is required.' })
	visibility: Visibility
}

@InputType()
export class QueryInput extends PaginationInput {
	@Field(() => Sort)
	@IsString({ message: 'Sort must be a string.' })
	@IsNotEmpty({ message: 'Sort is required.' })
	sort: Sort

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Search Term must be a string.' })
	searchTerm?: string
}

