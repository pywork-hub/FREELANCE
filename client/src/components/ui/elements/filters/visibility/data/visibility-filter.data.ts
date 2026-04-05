import { Visibility } from '@/__generated__/output'
import type { ISelectItem } from '@/components/ui/common/form/custom-select/interface/select.interface'

export const VISIBILITY_FILTER_DATA: ISelectItem<Visibility>[] = [
	{
		key: Visibility.Visible,
		label: 'Видимый',
	},
	{
		key: Visibility.Hidden,
		label: 'Скрытий',
	},
]
