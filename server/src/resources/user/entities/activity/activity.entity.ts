import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ActivityStatus } from '../../enums/activity-status'

@ObjectType()
export class Activity {
	@Field(() => ActivityStatus)
	status: ActivityStatus

	@Field(() => Date)
	lastSeen: Date
}


