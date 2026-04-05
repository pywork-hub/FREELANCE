import type { TypeCatalogFilters } from '@/shared/types/filter/filter.type'
import type { ReadonlyURLSearchParams } from 'next/navigation'

export const catalogRangeFilters = (
	filters: TypeCatalogFilters,
	searchParams: ReadonlyURLSearchParams
) => {
	const minPrice = searchParams.get('minPrice') || filters.minPrice

	const maxPrice = searchParams.get('maxPrice') || filters.maxPrice

	const minTerm = searchParams.get('minTerm') || filters.minTerm

	const maxTerm = searchParams.get('maxTerm') || filters.maxTerm

	return {
		minPrice: +minPrice,
		maxPrice: +maxPrice,
		minTerm: +minTerm,
		maxTerm: +maxTerm,
	}
}
