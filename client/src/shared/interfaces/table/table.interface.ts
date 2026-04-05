import type { LucideIcon } from 'lucide-react'

export interface ITableColumn {
	value: string
	isImage?: boolean
}

export interface ITableRow {
	columns: ITableColumn[]
}

export interface ITableHeading {
	title: string
	icon: LucideIcon
}

export interface ITable {
	heading: ITableHeading
	labels: string[]
	rows: ITableRow[]
	imageWidth: number
	imageHeight: number
}
