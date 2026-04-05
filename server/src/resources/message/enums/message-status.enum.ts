import { registerEnumType } from '@nestjs/graphql'

export enum MessageStatus {
	POSTED = 'POSTED',
	EDITED = 'EDITED',
	DELETED = 'DELETED',
}

registerEnumType(MessageStatus, {
	name: 'MessageStatus',
})
