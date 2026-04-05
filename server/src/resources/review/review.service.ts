import { Injectable } from '@nestjs/common'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { PaginationService } from '../pagination/pagination.service'
import { reviewSelect } from './selects/review.select'

@Injectable()
export class ReviewService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput, slug: string) {
		const { createFilter, getSortFilter } = queryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = createFilter(input)

		const reviews = await this.prisma.review.findMany({
			where: {
				...filters,
				service: {
					slug,
				},
			},
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			select: reviewSelect,
		})

		const count = await this.prisma.review.count({
			where: {
				...filters,
				service: {
					slug,
				},
			},
		})

		return {
			reviews: reviews || [],
			count: count || 0,
		}
	}
}
