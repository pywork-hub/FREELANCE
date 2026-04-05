import { Args, Query, Resolver } from '@nestjs/graphql'
import { AnalyticsService } from './analytics.service'
import { Analytics } from './entities/analytic.entity'
import { AnalyticsQueryInput } from './inputs/analytics-query.input'

@Resolver()
export class AnalyticsResolver {
	constructor(private readonly analyticService: AnalyticsService) {}

	@Query(() => Analytics, { name: 'analytics' })
	async getAll(@Args('query') input: AnalyticsQueryInput) {
		return this.analyticService.getAnalytics(input)
	}
}
