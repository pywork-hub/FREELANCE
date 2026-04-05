import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'

export interface ISelectItem<K = string> {
	label: string
	key: K
}

export interface ISelect<K = string> extends IClassName{
	data: ISelectItem<K>[]
	onChange: (item: ISelectItem<K>) => void
	value?: ISelectItem<K>
	label?: string
}
