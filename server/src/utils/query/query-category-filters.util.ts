import { Sort, Visibility } from 'src/global/enums/query.enum'
import { CategoryQueryInput } from 'src/resources/category/inputs/category-query.input'

export const queryCategoryFilters = () => {
	const createFilter = (input: CategoryQueryInput) => {
		const filters = []

		if (input.searchTerm) filters.push(getSearchTermFilter(input.searchTerm))

		if (input.visibility) filters.push(getVisibilityFilter(input.visibility))

		if (input.isParents) filters.push(getIsParentsFilter())
		if (input.parentSlug) filters.push(getByParentFilter(input.parentSlug))

		return filters.length ? { AND: filters } : {}
	}

	const getSortFilter = (sort: Sort): any[] => {
		return [{ createdAt: sort === Sort.DESC ? 'desc' : 'asc' }]
	}

	const getIsParentsFilter = () => {
		return {
			parents: { none: {} },
		}
	}

	const getByParentFilter = (parentSlug: string) => {
		return {
			parents: {
				some: {
					slug: parentSlug,
				},
			},
		}
	}

	const getVisibilityFilter = (visibility: Visibility) => {
		return {
			visibility,
		}
	}

	const getSearchTermFilter = (searchTerm: string) => {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	return { createFilter, getSortFilter }
}
