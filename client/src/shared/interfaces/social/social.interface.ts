import type { LucideIcon } from 'lucide-react'

export interface ISocialItem {
	icon: LucideIcon
	href: string
}

export interface ISocial {
	items: ISocialItem[]
}
