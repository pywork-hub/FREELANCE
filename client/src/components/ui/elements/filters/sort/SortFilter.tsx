'use client'

import { Sort } from '@/__generated__/output'
import Select from '@/components/ui/common/form/custom-select/Select'
import type { FC } from 'react'
import type { ISortFilter } from '../interface/filters.interface'
import { SORT_FILTER_DATA } from './data/sort-filter.data'

const SortFilter: FC<ISortFilter> = ({
	sort,
	updateQueryFilters,
	className,
}) => {
	return (
		<Select<Sort>
			className={className}
			label="Сортировка"
			data={SORT_FILTER_DATA}
			onChange={(value) => {
				updateQueryFilters('sort', value.key)
			}}
			value={SORT_FILTER_DATA.find((value) => value.key === sort)}
		/>
	)
}

export default SortFilter
