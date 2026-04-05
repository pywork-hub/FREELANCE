import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { queryAnalyticsFilters } from 'src/utils/query/query-analytics-filters.util'
import { OrderStatus } from '../order/enums/order-status.enum'
import { ActivityStatus } from '../user/enums/activity-status'
import { UserRole } from '../user/enums/user-role.enum'
import { Analytics } from './entities/analytic.entity'
import { AnalyticsQueryInput } from './inputs/analytics-query.input'

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAnalytics(input: AnalyticsQueryInput): Promise<Analytics> {
		const { startDate } = queryAnalyticsFilters(input)

		const [
			onlineUsersCount,
			offlineUsersCount,
			topPurchasersData,
			popularServicesData,
			inProcessOrdersCount,
			completedOrdersCount,
			canceledOrdersCount,
			expiredOrdersCount,
			refundedOrdersCount,
			totalEarned,
		] = await Promise.all([
			this.prisma.activity.count({
				where: {
					status: ActivityStatus.ONLINE,
					user: {
						NOT: [
							{
								roles: {
									has: UserRole.ADMIN,
								},
							},
							{
								roles: {
									has: UserRole.MANAGER,
								},
							},
						],
					},
				},
			}),
			this.prisma.activity.count({
				where: {
					status: ActivityStatus.OFFLINE,
					user: {
						NOT: [
							{
								roles: {
									has: UserRole.ADMIN,
								},
							},
							{
								roles: {
									has: UserRole.MANAGER,
								},
							},
						],
					},
				},
			}),
			this.prisma.user.findMany({
				where: {
					orders: {
						some: {
							status: {
								not: OrderStatus.CANCELED,
							},
							createdAt: {
								gte: startDate,
							},
						},
					},
					NOT: {
						roles: {
							hasSome: [UserRole.ADMIN, UserRole.MANAGER],
						},
					},
				},
				orderBy: {
					orders: {
						_count: 'desc',
					},
				},
				take: 5,
				select: {
					profile: {
						select: {
							login: true,
							avatarPath: true,
						},
					},
					orders: true,
				},
			}),
			this.prisma.service.findMany({
				where: {
					createdAt: {
						gte: startDate,
					},
				},
				orderBy: {
					orderTimes: 'desc',
				},
				take: 5,
				select: {
					id: true,
					name: true,
					coverPath: true,
					orderTimes: true,
					categories: {
						select: {
							name: true,
						},
					},
				},
			}),
			this.prisma.order.count({
				where: {
					status: OrderStatus.IN_PROCESS,
					createdAt: {
						gte: startDate,
					},
				},
			}),
			this.prisma.order.count({
				where: {
					status: OrderStatus.COMPLETED,
					createdAt: {
						gte: startDate,
					},
				},
			}),
			this.prisma.order.count({
				where: {
					status: OrderStatus.CANCELED,
					createdAt: {
						gte: startDate,
					},
				},
			}),
			this.prisma.order.count({
				where: {
					status: OrderStatus.EXPIRED,
					createdAt: {
						gte: startDate,
					},
				},
			}),
			this.prisma.order.count({
				where: {
					status: OrderStatus.REFUNDED,
					createdAt: {
						gte: startDate,
					},
				},
			}),
			this.prisma.order.aggregate({
				where: {
					status: {
						not: OrderStatus.REFUNDED,
					},
					createdAt: {
						gte: startDate,
					},
				},
				_sum: {
					total: true,
				},
			}),
		])

		const topPurchasers = topPurchasersData.map((user) => ({
			login: user.profile.login,
			avatarPath: user.profile.avatarPath,
			ordersCount: user.orders.length,
			ordersAmount: user.orders.reduce((acc, order) => acc + order.total, 0),
		}))

		const popularServices = popularServicesData.map((service) => ({
			id: service.id,
			name: service.name,
			coverPath: service.coverPath,
			categories: service.categories.map((category) => category.name),
			orderTimes: service.orderTimes,
		}))

		return {
			onlineUsersCount: onlineUsersCount || 0,
			offlineUsersCount: offlineUsersCount || 0,
			topPurchasers: topPurchasers || [],
			popularServices: popularServices || [],
			inProcessOrdersCount: inProcessOrdersCount || 0,
			completedOrdersCount: completedOrdersCount || 0,
			canceledOrdersCount: canceledOrdersCount || 0,
			expiredOrdersCount: expiredOrdersCount || 0,
			refundedOrdersCount: refundedOrdersCount || 0,
			totalEarned: totalEarned._sum.total || 0,
		}
	}
}
