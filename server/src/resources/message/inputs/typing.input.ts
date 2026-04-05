import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class TypingInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number

	@Field(() => Boolean)
	@IsNotEmpty({ message: 'Is Typing is required.' })
	@IsBoolean({ message: 'Is Typing must be a boolean.' })
	isTyping: boolean
}
