import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Room } from 'src/resources/room/entities/room.entity'
import { User } from 'src/resources/user/entities/full/user.entity'
import { MessageStatus } from '../enums/message-status.enum'
import { MessageType } from '../enums/message-type.enum'

@ObjectType()
export class Message {
	@Field(() => Int)
	id: number

	@Field(() => String)
	content: string

	@Field(() => Room)
	room: Room

	@Field(() => User)
	sender: User

	@Field(() => Int)
	roomId: number

	@Field(() => Int)
	senderId: number

	@Field(() => Int, { nullable: true })
	orderId?: number

	@Field(() => MessageType)
	type: MessageType

	@Field(() => Boolean)
	isChecked: boolean

	@Field(() => MessageStatus)
	status: MessageStatus

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class RoomMessage {
	@Field(() => Int)
	id: number

	@Field(() => String)
	content: string

	@Field(() => MessageType)
	type: MessageType

	@Field(() => User)
	sender: User

	@Field(() => Boolean)
	isChecked: boolean

	@Field(() => MessageStatus)
	status: MessageStatus

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class LastMessage {
	@Field(() => Int)
	id: number

	@Field(() => String)
	content: string

	@Field(() => Int)
	senderId: number

	@Field(() => MessageType)
	type: MessageType

	@Field(() => Boolean)
	isChecked: boolean

	@Field(() => MessageStatus)
	status: MessageStatus

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
