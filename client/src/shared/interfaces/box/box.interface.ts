import type { LucideIcon } from 'lucide-react'

export interface IBox {
	icon: LucideIcon
	name: string
	description: string
}

export interface IBoxes {
	items: IBox[]
}
