import type { CatalogQuery } from '@/__generated__/output'
import type { ChangeEvent } from 'react'

export type TypeCatalogFilters = NonNullable<CatalogQuery['catalog']['filters']>

export type TypeCatalogAttribute = TypeCatalogFilters['attributes'][0]

export type TypeCatalogRangeFilters = Pick<
	TypeCatalogFilters,
	'minPrice' | 'maxPrice' | 'minTerm' | 'maxTerm'
>

export type TypeCatalogRangeFiltersErrors = {
	[K in keyof TypeCatalogRangeFilters]: string
}

export type TypeCatalogRangeFiltersData = {
	onChange: (
		e: ChangeEvent<HTMLInputElement>,
		variant: keyof TypeCatalogRangeFilters
	) => void
	values: TypeCatalogRangeFilters
	errors: TypeCatalogRangeFiltersErrors
}

export type TypeCatalogParams = {
	label: string
	key: string
	value: string
}
