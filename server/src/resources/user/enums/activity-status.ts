import { registerEnumType } from '@nestjs/graphql'

export enum ActivityStatus {
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

registerEnumType(ActivityStatus, {
	name: 'ActivityStatus',
})
