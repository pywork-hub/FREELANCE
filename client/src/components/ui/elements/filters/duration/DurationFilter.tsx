'use client'

import Select from '@/components/ui/common/form/custom-select/Select'
import type { FC } from 'react'
import type {
	IDurationFilter,
	TypeDurationFilter,
} from '../interface/filters.interface'
import { DURATION_FILTER_DATA } from './data/duration-filter.data'

const DurationFilter: FC<IDurationFilter> = ({
	duration,
	updateQueryFilters,
	className,
}) => {
	return (
		<Select<TypeDurationFilter>
			className={className}
			label="Время"
			data={DURATION_FILTER_DATA}
			onChange={(value) => {
				updateQueryFilters(value.key)
			}}
			value={DURATION_FILTER_DATA.find((value) => value.key === duration)}
		/>
	)
}

export default DurationFilter
