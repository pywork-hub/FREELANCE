import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'
import { CreatableSelectInput } from 'src/global/inputs/select.input'

@InputType()
export class OpenGraphsImageInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Url is required.' })
	@IsString({ message: 'Url must be a string.' })
	url: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Alt is required.' })
	@IsString({ message: 'Alt must be a string.' })
	alt: string
}

@InputType()
export class OpenGraphsInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Title is required.' })
	@IsString({ message: 'Title must be a string.' })
	title: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Description is required.' })
	@IsString({ message: 'Description must be a string.' })
	description: string

	@Field(() => [OpenGraphsImageInput])
	@IsOptional()
	@IsArray({ message: 'Open Graph Images must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => OpenGraphsImageInput)
	images: OpenGraphsImageInput[]
}

@InputType()
export class SeoInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Title is required.' })
	@IsString({ message: 'Title must be a string.' })
	title: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Description is required.' })
	@IsString({ message: 'Description must be a string.' })
	description: string

	@Field(() => [CreatableSelectInput])
	@IsNotEmpty({ message: 'Please select at least 1 keyword.' })
	@IsArray({ message: 'Keywords must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => CreatableSelectInput)
	keywords: CreatableSelectInput[]

	@Field(() => OpenGraphsInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => OpenGraphsInput)
	graphs?: OpenGraphsInput
}
