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
export class AttributeInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => [CreatableSelectInput])
	@IsArray({ message: 'Properties must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => CreatableSelectInput)
	properties: CreatableSelectInput[]
}
