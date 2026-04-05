import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

@InputType()
export class BlockItemInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Heading must be a string.' })
	heading?: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Content is required.' })
	@IsString({ message: 'Content must be a string.' })
	content: string
}

@InputType()
export class BlockInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Heading must be a string.' })
	heading?: string

	@Field(() => [BlockItemInput])
	@IsArray({ message: 'Block Item must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => BlockItemInput)
	items: BlockItemInput[]
}
