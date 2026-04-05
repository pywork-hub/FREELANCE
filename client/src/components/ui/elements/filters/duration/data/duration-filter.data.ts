import type { ISelectItem } from '@/components/ui/common/form/custom-select/interface/select.interface'
import type { TypeDurationFilter } from '../../interface/filters.interface'

export const DURATION_FILTER_DATA: ISelectItem<TypeDurationFilter>[] = [
	{
		key: 'all',
		label: 'За все время',
	},
	{
		key: '1y',
		label: 'За год',
	},
	{
		key: '1m',
		label: 'За месяц',
	},
	{
		key: '1w',
		label: 'За неделю',
	},
	{
		key: '1d',
		label: 'За день',
	},
	{
		key: '1h',
		label: 'За час',
	},
]
