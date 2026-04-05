'use client'

import { Visibility } from '@/__generated__/output'
import Select from '@/components/ui/common/form/custom-select/Select'
import type { FC } from 'react'
import { IVisibilityFilter } from '../interface/filters.interface'
import { VISIBILITY_FILTER_DATA } from './data/visibility-filter.data'

const VisibilityFilter: FC<IVisibilityFilter> = ({
	updateQueryFilters,
	visibility,
	className,
}) => {
	return (
		<Select<Visibility | null>
			className={className}
			label="Видимость"
			data={VISIBILITY_FILTER_DATA}
			onChange={(value) => {
				updateQueryFilters('visibility', value.key)
			}}
			value={VISIBILITY_FILTER_DATA.find((value) => value.key === visibility)}
		/>
	)
}

export default VisibilityFilter
