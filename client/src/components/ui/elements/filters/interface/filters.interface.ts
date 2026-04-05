import type { Sort, Visibility } from '@/__generated__/output'
import type {
	IManageAnalyticsFilters,
	IManageFilters,
	IManageFullestFilters,
} from '@/shared/interfaces/filter/filter.interface'

export type TypeYearFilter = 'movie' | 'serial'
export type TypeDurationFilter = '1h' | '1d' | '1w' | '1m' | '1y' | 'all'

export interface IFullestFilterProps
	extends Pick<IManageFullestFilters, 'updateQueryFilters'> {
	className?: string
}

export interface IFilterProps
	extends Pick<IManageFilters, 'updateQueryFilters'> {
	className?: string
}

export interface IAnalyticsFilterProps
	extends Pick<IManageAnalyticsFilters, 'updateQueryFilters'> {
	className?: string
}

export interface IVisibilityFilter extends IFullestFilterProps {
	visibility?: Visibility | null
}

export interface ISortFilter extends IFilterProps {
	sort?: Sort | null
}

export interface IDurationFilter extends IAnalyticsFilterProps {
	duration: TypeDurationFilter
}
