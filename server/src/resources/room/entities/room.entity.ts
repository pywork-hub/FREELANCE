import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Message } from 'src/resources/message/entities/message.entity'
import { User } from 'src/resources/user/entities/full/user.entity'

@ObjectType()
export class Room {
	@Field(() => Int)
	id: number

	@Field(() => [Message])
	messages: Message[]

	@Field(() => [User])
	users: User[]

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
