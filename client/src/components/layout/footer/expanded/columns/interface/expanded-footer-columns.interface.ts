import type { IMenu } from '@/shared/interfaces/menu/menu.interface'

export interface IExpandedFooterColumn extends IMenu {
	title: string
}

export interface IExpandedFooterColumns {
	columns: IExpandedFooterColumn[]
}
