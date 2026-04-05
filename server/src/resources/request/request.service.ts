import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { QueryInput } from 'src/global/inputs/query.input'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { RequestInput } from './inputs/request.input'

@Injectable()
export class RequestService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { createFilter, getSortFilter } = queryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		let filters = createFilter(input)

		const requests = await this.prisma.request.findMany({
			where: filters,
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
		})

		const count = await this.prisma.request.count({
			where: filters,
		})

		return {
			requests: requests || [],
			count: count || 0
		}
	}

	async send(input: RequestInput) {
		return this.prisma.request.create({
			data: {
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				message: input.message
			},
			select: {
				id: true
			}
		})
	}

	// Admin Place
	async byId(id: number) {
		const request = await this.prisma.request.findUnique({
			where: {
				id,
			},
		})

		if (!request) throw new NotFoundException('Обращение не найдено.')

		return request
	}

	async delete(id: number) {
		return this.prisma.request.delete({
			where: {
				id,
			},
		})
	}
}
