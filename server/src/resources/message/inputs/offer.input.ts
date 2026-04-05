import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class OfferInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'Term is required.' })
	@IsNumber({}, { message: 'Term must be a number.' })
	term: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Price is required.' })
	@IsNumber({}, { message: 'Price must be a number.' })
	price: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Description is required.' })
	@IsString({ message: 'Description must be a string.' })
	description: string
}
