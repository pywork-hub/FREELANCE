import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class ReviewInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Rating is required.' })
	@IsNumber({}, { message: 'Rating must be a number.' })
	rating: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Comment is required.' })
	@IsString({ message: 'Comment must be a string.' })
	comment: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'Service Id is required.' })
	@IsNumber({}, { message: 'Service Id must be a number.' })
	serviceId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number
}

@InputType()
export class ReviewEditInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Review Id is required.' })
	@IsNumber({}, { message: 'Review Id must be a number.' })
	reviewId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Rating is required.' })
	@IsNumber({}, { message: 'Rating must be a number.' })
	rating: number

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString({ message: 'Comment must be a string.' })
	comment?: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'Service Id is required.' })
	@IsNumber({}, { message: 'Service Id must be a number.' })
	serviceId: number
}
