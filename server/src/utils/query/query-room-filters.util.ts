import { Sort } from 'src/global/enums/query.enum'
import { QueryInput } from 'src/global/inputs/query.input'

export const queryRoomFilters = (currentUserId: number) => {
	const createFilter = (input: QueryInput) => {
		const filters = []

		if (input.searchTerm) filters.push(getSearchTermFilter(input.searchTerm))

		return filters.length ? { AND: filters } : {}
	}

	const getSortFilter = (sort: Sort): any[] => {
		return [{ createdAt: sort === Sort.DESC ? 'desc' : 'asc' }]
	}

	const getSearchTermFilter = (searchTerm: string) => {
		return {
			users: {
				some: {
					id: {
						not: currentUserId,
					},
					profile: {
						login: {
							contains: searchTerm,
							mode: 'insensitive',
						},
					},
				},
			},
		}
	}

	return { createFilter, getSortFilter }
}
