import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { MessageStatus } from '../enums/message-status.enum'

@InputType()
export class MessageActionInput {
	@Field(() => String, { nullable: true })
	@IsNotEmpty({ message: 'Message is required.' })
	@IsString({ message: 'Message must be a string.' })
	content?: string

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber({}, { message: 'Message Id must be a number.' })
	messageId?: number

	@Field(() => Int)
	@IsNotEmpty({ message: 'Room Id is required.' })
	@IsNumber({}, { message: 'Room Id must be a number.' })
	roomId: number

	@Field(() => MessageStatus)
	@IsNotEmpty({ message: 'Action is required.' })
	@IsString({ message: 'Action must be a string.' })
	action: MessageStatus
}
