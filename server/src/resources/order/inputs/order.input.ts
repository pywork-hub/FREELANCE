import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class OrderInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => Int)
	@IsNotEmpty({ message: 'Total is required.' })
	@IsNumber({}, { message: 'Total must be a number.' })
	total: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Term is required.' })
	@IsNumber({}, { message: 'Term must be a number.' })
	term: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Manager Id is required.' })
	@IsNumber({}, { message: 'Manager Id must be a number.' })
	managerId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'User Id is required.' })
	@IsNumber({}, { message: 'User Id must be a number.' })
	userId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number
}

@InputType()
export class OrderActionInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Order Id is required.' })
	@IsNumber({}, { message: 'Order Id must be a number.' })
	orderId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Manager Id is required.' })
	@IsNumber({}, { message: 'Manager Id must be a number.' })
	managerId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'User Id is required.' })
	@IsNumber({}, { message: 'User Id must be a number.' })
	userId: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Type is required.' })
	@IsString({ message: 'Type must be a string.' })
	type: 'canceled' | 'completed' | 'inProcess' | 'refunded'

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber({}, { message: 'Term must be a number.' })
	term?: number
}
