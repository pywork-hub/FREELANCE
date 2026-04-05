import { Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts'
import { SelectInput } from 'src/global/inputs/select.input'

@InputType()
export class ExampleInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Preview is required.' })
	@IsString({ message: 'Preview must be a string.' })
	coverPath: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Main Image is required.' })
	@IsString({ message: 'Main Image must be a string.' })
	imagePath: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Url must be a string.' })
	url?: string

	@Field(() => SelectInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	user?: SelectInput

	@Field(() => SelectInput, { nullable: true })
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => SelectInput)
	service?: SelectInput
}

@InputType()
export class AddExampleInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Url must be a string.' })
	url?: string

	@Field(() => Int)
	@IsNumber({}, { message: 'User Id must be a number.' })
	@IsNotEmpty({ message: 'User Id is required.' })
	userId: number

	@Field(() => Int)
	@IsNumber({}, { message: 'Service Id must be a number.' })
	@IsNotEmpty({ message: 'Service Id is required.' })
	serviceId: number
}
