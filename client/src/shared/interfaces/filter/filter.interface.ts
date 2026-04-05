import type { QueryFullestInput, QueryInput } from '@/__generated__/output'
import type { TypeDurationFilter } from '@/components/ui/elements/filters/interface/filters.interface'
import type { TypeCatalogCategory } from '@/shared/types/category/category.type'
import type {
	TypeCatalogAttribute,
	TypeCatalogFilters,
} from '@/shared/types/filter/filter.type'
import type { ReadonlyURLSearchParams } from 'next/navigation'

export interface IManageFullestFilters {
	queryParams: QueryFullestInput
	updateQueryFilters: (
		key: keyof QueryFullestInput,
		value: string | null
	) => void
}

export interface IManageFilters {
	queryParams: QueryInput
	updateQueryFilters: (key: keyof QueryInput, value: string | null) => void
}

export interface IManageAnalyticsFilters {
	duration: TypeDurationFilter
	updateQueryFilters: (value: TypeDurationFilter) => void
}

export interface ICatalogFiltersCategories {
	categories: TypeCatalogCategory[]
}

export interface ICatalogFilters {
	searchParams: ReadonlyURLSearchParams
	filters: TypeCatalogFilters
	selectedProperties: string[]
}

export interface ICatalogFiltersAttribute {
	attribute: TypeCatalogAttribute
	selectedProperties: string[]
	updateQueryParams: (key: string, value: string, multiple?: boolean) => void
	removeQueryParam: (key: string, value: string) => void
}
