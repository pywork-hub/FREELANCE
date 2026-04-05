import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface IMenuItem {
	label: string
	href: string
	icon?: LucideIcon
	onClick?: () => void
}

export interface IMenu {
	items: IMenuItem[]
}

export interface IMenuItemProps {
	item: IMenuItem
	itemClassName?: string
	linkClassName?: string
}

export interface IMenuProps extends IMenu {
	listClassName?: string
	itemClassName?: string
	linkClassName?: string
	additionalItem?: ReactNode
}
