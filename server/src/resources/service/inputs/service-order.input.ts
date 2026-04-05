import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class ServiceOrderInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'ServiceSlug is required.' })
	@IsString({ message: 'ServiceSlug must be a string.' })
	serviceSlug: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'Quantity is required.' })
	@IsNumber({}, { message: 'Quantity must be a number.' })
	quantity: number
}
