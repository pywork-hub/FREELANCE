import { registerEnumType } from '@nestjs/graphql'

export enum OrderStatus {
	PENDING = 'PENDING',
	IN_PROCESS = 'IN_PROCESS',
	COMPLETED = 'COMPLETED',
	CANCELED = 'CANCELED',
	EXPIRED = 'EXPIRED',
	REFUNDED = 'REFUNDED',
}

registerEnumType(OrderStatus, {
	name: 'OrderStatus',
})
