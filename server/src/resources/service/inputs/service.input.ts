import { Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'
import { SelectInput } from 'src/global/inputs/select.input'
import { SeoInput } from 'src/resources/seo/inputs/seo.input'

@InputType()
export class ServiceInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'From Price is required.' })
	@IsNumber({}, { message: 'From Price must be a number.' })
	fromPrice: number

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber({}, { message: 'From Sale Price must be a number.' })
	fromSalePrice?: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'From Term is required.' })
	@IsNumber({}, { message: 'From Term must be a number.' })
	fromTerm: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Excerpt is required.' })
	@IsString({ message: 'Excerpt must be a string.' })
	excerpt: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Description is required.' })
	@IsString({ message: 'Description must be a string.' })
	description: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Preview is required.' })
	@IsString({ message: 'Preview must be a string.' })
	coverPath: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Video is required.' })
	@IsString({ message: 'Video must be a string.' })
	videoPath: string

	@Field(() => [SelectInput])
	@IsOptional()
	@IsArray({ message: 'Examples must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	examples: SelectInput[]

	@Field(() => [SelectInput])
	@IsOptional()
	@IsArray({ message: 'Categories must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	categories: SelectInput[]

	@Field(() => [SelectInput])
	@IsOptional()
	@IsArray({ message: 'Properties must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	properties: SelectInput[]

	@Field(() => SeoInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => SeoInput)
	seo?: SeoInput
}
