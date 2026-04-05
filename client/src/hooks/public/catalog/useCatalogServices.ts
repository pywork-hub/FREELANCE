import {
	Sort,
	Visibility,
	useServicesQuery,
	type ServiceQueryInput,
} from '@/__generated__/output'
import type { TypeRequiredPagination } from '@/shared/types/pagination/pagination.type'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useCatalogServices = (categorySlug?: string) => {
	const searchParams = useSearchParams()

	const excludeParams = [
		'page',
		'minPrice',
		'maxPrice',
		'minTerm',
		'maxTerm',
		'searchTerm',
	]

	const extractProperties = (params: URLSearchParams) => {
		const properties: string[] = []
		params.forEach((value, key) => {
			if (!excludeParams.includes(key)) {
				properties.push(value)
			}
		})
		return properties
	}

	const initialProperties = extractProperties(searchParams)

	const [query, setQuery] = useState<
		ServiceQueryInput & TypeRequiredPagination
	>({
		page: searchParams.get('page') || '1',
		perPage: searchParams.get('perPage') || '12',
		properties: initialProperties,
		searchTerm: searchParams.get('searchTerm') || '',
		minPrice: searchParams.get('minPrice') || '',
		maxPrice: searchParams.get('maxPrice') || '',
		minTerm: searchParams.get('minTerm') || '',
		maxTerm: searchParams.get('maxTerm') || '',
		orderTimes: Sort.Desc,
		sort: Sort.Desc,
		visibility: Visibility.Visible,
	})

	const { data, error, loading } = useServicesQuery({
		variables: { query, categorySlug },
	})

	useEffect(() => {
		const properties = extractProperties(searchParams)

		setQuery((prev) => ({
			...prev,
			properties: properties.length > 0 ? properties : undefined,
			searchTerm: searchParams.get('searchTerm') || '',
			minPrice: searchParams.get('minPrice') || '',
			maxPrice: searchParams.get('maxPrice') || '',
			minTerm: searchParams.get('minTerm') || '',
			maxTerm: searchParams.get('maxTerm') || '',
			page: searchParams.get('page') || prev.page,
			perPage: searchParams.get('perPage') || prev.perPage,
		}))
	}, [searchParams])

	return {
		services: data?.services.services || [],
		count: data?.services.count || 0,
		error,
		loading,
		page: query.page,
		perPage: query.perPage,
		properties: query.properties || [],
		searchParams,
		setQuery,
	}
}
