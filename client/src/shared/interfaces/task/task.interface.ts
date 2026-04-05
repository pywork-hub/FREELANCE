import type { LucideIcon } from 'lucide-react'

export interface ITaskItem {
	icon: LucideIcon
	name: string
	description: string
}

export interface ITasks {
	items: ITaskItem[]
}
