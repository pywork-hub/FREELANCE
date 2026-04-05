import { Visibility, type Prisma } from '@prisma/client'
import { Sort } from 'src/global/enums/query.enum'
import { ServiceQueryInput } from 'src/resources/service/inputs/service-query.input'

export const queryServiceFilters = () => {
	const createFilter = (input: ServiceQueryInput) => {
		const filters = []

		if (input.searchTerm) filters.push(getSearchTermFilter(input.searchTerm))

		if (input.visibility) filters.push(getVisibilityFilter(input.visibility))

		if (input.properties) filters.push(getPropertiesFilter(input.properties))

		if (input.minPrice || input.maxPrice)
			filters.push(getPriceFilter(+input.minPrice, +input.maxPrice))

		if (input.minTerm || input.maxTerm)
			filters.push(getTermFilter(+input.minTerm, +input.maxTerm))

		return filters.length ? { AND: filters } : {}
	}

	const createOrderBy = (input: ServiceQueryInput) => {
		const orderBy = []

		if (input.orderTimes) {
			orderBy.push(getOrderTimesFilter(input.orderTimes))
		} else if (input.sort) {
			orderBy.push(getSortFilter(input.sort))
		}

		return orderBy
	}

	const getOrderTimesFilter = (orderTimes: Sort) => {
		return { orderTimes: orderTimes === Sort.DESC ? 'desc' : 'asc' }
	}

	const getSortFilter = (sort: Sort) => {
		return { createdAt: sort === Sort.DESC ? 'desc' : 'asc' }
	}

	const getPriceFilter = (
		minPrice?: number,
		maxPrice?: number
	): Prisma.ServiceWhereInput => {
		let priceFilter: Prisma.ServiceWhereInput = {}

		if (minPrice && maxPrice) {
			priceFilter = {
				OR: [
					{
						fromSalePrice: {
							gte: minPrice,
							lte: maxPrice,
						},
					},
					{
						fromPrice: {
							gte: minPrice,
							lte: maxPrice,
						},
						fromSalePrice: null,
					},
				],
			}
		} else if (minPrice) {
			priceFilter = {
				OR: [
					{
						fromSalePrice: {
							gte: minPrice,
						},
					},
					{
						fromPrice: {
							gte: minPrice,
						},
						fromSalePrice: null,
					},
				],
			}
		} else if (maxPrice) {
			priceFilter = {
				OR: [
					{
						fromSalePrice: {
							lte: maxPrice,
						},
					},
					{
						fromPrice: {
							lte: maxPrice,
						},
						fromSalePrice: null,
					},
				],
			}
		}

		return priceFilter
	}

	const getTermFilter = (
		minTerm?: number,
		maxTerm?: number
	): Prisma.ServiceWhereInput => {
		let termFilter: Prisma.ServiceWhereInput = {}

		if (minTerm && maxTerm) {
			termFilter = { fromTerm: { gte: minTerm * 86400, lte: maxTerm * 86400 } }
		} else if (minTerm) {
			termFilter = { fromTerm: { gte: minTerm * 86400 } }
		} else if (maxTerm) {
			termFilter = { fromTerm: { lte: maxTerm * 86400 } }
		}

		return termFilter
	}

	const getVisibilityFilter = (visibility: Visibility) => {
		return {
			visibility,
		}
	}

	const getPropertiesFilter = (properties: string[]) => {
		return {
			properties: {
				some: {
					slug: {
						in: properties.map((property) => property),
					},
				},
			},
		}
	}

	const getSearchTermFilter = (
		searchTerm: string
	): Prisma.ServiceWhereInput => {
		return {
			OR: [
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive',
					},
				},
				{
					categories: {
						some: {
							name: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					},
				},
			],
		}
	}

	return { createFilter, createOrderBy }
}
