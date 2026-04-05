import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class ChangeRoomManagerInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Manager Id is required.' })
	@IsNumber({}, { message: 'Manager Id must be a number.' })
	managerId: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number
}
