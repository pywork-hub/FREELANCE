import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class ReviewOfferInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Service Id is required.' })
	@IsNumber({}, { message: 'Service Id must be a number.' })
	serviceId: number
}
