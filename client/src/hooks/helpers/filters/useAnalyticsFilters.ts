import type { TypeDurationFilter } from '@/components/ui/elements/filters/interface/filters.interface'
import { useState } from 'react'

export const useAnalyticsFilters = () => {
	const initialDuration: TypeDurationFilter = 'all'
	const [duration, setDuration] = useState<TypeDurationFilter>(initialDuration)

	const updateQueryFilters = (value: TypeDurationFilter) => {
		setDuration(value)
	}

	return {
		updateQueryFilters,
		duration,
	}
}
