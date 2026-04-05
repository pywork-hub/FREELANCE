import { useAnalyticsQuery } from '@/__generated__/output'
import type { TypeDurationFilter } from '@/components/ui/elements/filters/interface/filters.interface'
import toast from 'react-hot-toast'

export const useManageAnalytics = (duration: TypeDurationFilter) => {
	const { data } = useAnalyticsQuery({
		variables: {
			query: {
				duration,
			},
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		onlineUsersCount: data?.analytics.onlineUsersCount || 0,
		offlineUsersCount: data?.analytics.offlineUsersCount || 0,
		topPurchasers: data?.analytics.topPurchasers || [],
		popularServices: data?.analytics.popularServices || [],
		inProcessOrdersCount: data?.analytics.inProcessOrdersCount || 0,
		completedOrdersCount: data?.analytics.completedOrdersCount || 0,
		canceledOrdersCount: data?.analytics.canceledOrdersCount || 0,
		expiredOrdersCount: data?.analytics.expiredOrdersCount || 0,
		refundedOrdersCount: data?.analytics.refundedOrdersCount || 0,
		totalEarned: data?.analytics.totalEarned || 0,
	}
}
