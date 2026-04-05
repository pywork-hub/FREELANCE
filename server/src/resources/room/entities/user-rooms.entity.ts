import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
	LastMessage,
	RoomMessage,
} from 'src/resources/message/entities/message.entity'
import { Activity } from 'src/resources/user/entities/activity/activity.entity'
import { Profile } from 'src/resources/user/entities/full/profile.entity'

@ObjectType()
export class CurrentRoomPartner {
	@Field(() => Int)
	id: number

	@Field(() => Profile)
	profile: Profile

	@Field(() => Activity)
	activity: Activity
}

@ObjectType()
export class UserRoom {
	@Field(() => Int)
	id: number

	@Field(() => CurrentRoomPartner)
	partner: CurrentRoomPartner

	@Field(() => LastMessage, { nullable: true })
	lastMessage?: LastMessage
}

@ObjectType()
export class CurrentRoom {
	@Field(() => Int)
	id: number

	@Field(() => CurrentRoomPartner)
	partner: CurrentRoomPartner

	@Field(() => [RoomMessage])
	messages: RoomMessage[]
}
