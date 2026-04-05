import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Profile } from 'src/resources/user/entities/full/profile.entity'
import { OrderStatus } from '../enums/order-status.enum'

@ObjectType()
export class Order {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	description: string

	@Field(() => Int)
	total: number

	@Field(() => Int)
	term: number

	@Field(() => Profile)
	partner: Profile

	@Field(() => OrderStatus)
	status: OrderStatus

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	termUpdatedAt: Date
}

@ObjectType()
export class AllOrders {
	@Field(() => [Order])
	orders: Order[]

	@Field(() => Int)
	count: number
}
