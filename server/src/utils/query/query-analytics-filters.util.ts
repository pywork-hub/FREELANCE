import { AnalyticsQueryInput } from 'src/resources/analytics/inputs/analytics-query.input'

export const queryAnalyticsFilters = (input: AnalyticsQueryInput) => {
	let startDate: Date

	const now = new Date()

	switch (input.duration) {
		case '1h':
			startDate = new Date(now.getTime() - 60 * 60 * 1000)
			break
		case '1d':
			startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
			break
		case '1w':
			startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
			break
		case '1m':
			startDate = new Date(now.setMonth(now.getMonth() - 1))
			break
		case '1y':
			startDate = new Date(now.setFullYear(now.getFullYear() - 1))
			break
		case 'all':
		default:
			startDate = new Date(0)
			break
	}

	return {
		startDate,
	}
}
