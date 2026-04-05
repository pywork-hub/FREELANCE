import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnalyticsService {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	coverPath: string

	@Field(() => Int)
	orderTimes: number

	@Field(() => [String])
	categories: string[]
}

@ObjectType()
export class AnalyticsPurchaser {
	@Field(() => String)
	login: string

	@Field(() => String)
	avatarPath: string

	@Field(() => Int)
	ordersCount: number

	@Field(() => Int)
	ordersAmount: number
}

@ObjectType()
export class Analytics {
	@Field(() => Int)
	onlineUsersCount: number

	@Field(() => Int)
	offlineUsersCount: number

	@Field(() => [AnalyticsPurchaser])
	topPurchasers: AnalyticsPurchaser[]

	@Field(() => [AnalyticsService])
	popularServices: AnalyticsService[]

	@Field(() => Int)
	refundedOrdersCount: number

	@Field(() => Int)
	inProcessOrdersCount: number

	@Field(() => Int)
	completedOrdersCount: number

	@Field(() => Int)
	canceledOrdersCount: number

	@Field(() => Int)
	expiredOrdersCount: number

	@Field(() => Int)
	totalEarned: number
}
