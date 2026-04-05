import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'
import { SelectInput } from 'src/global/inputs/select.input'
import { BlockInput } from 'src/resources/block/inputs/block.input'
import { SeoInput } from 'src/resources/seo/inputs/seo.input'

@InputType()
export class CategoryInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Cover image is required.' })
	@IsString({ message: 'Cover image path must be a string.' })
	coverPath: string

	@Field(() => [SelectInput])
	@IsOptional()
	@IsArray({ message: 'Parents must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	parents: SelectInput[]

	@Field(() => SeoInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => SeoInput)
	seo?: SeoInput

	@Field(() => BlockInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => BlockInput)
	block?: BlockInput
}
