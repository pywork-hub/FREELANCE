import { PUBLIC_PAGES, USER_PAGES } from '@/constants/url.constants'
import type { IMenu } from '@/shared/interfaces/menu/menu.interface'
import {
	BookHeart,
	HelpCircle,
	Home,
	MessageSquareText,
	ShoppingBag,
	Store,
	User,
} from 'lucide-react'

export const EXPANDED_HEADER_BURGER_MENU_DATA: IMenu = {
	items: [
		{
			label: 'Главная',
			href: PUBLIC_PAGES.HOME,
			icon: Home,
		},
		{
			label: 'Вопросы - Ответы',
			href: PUBLIC_PAGES.FAQ,
			icon: HelpCircle,
		},
	],
}

export const EXPANDED_HEADER_BURGER_AUTH_MENU_DATA: IMenu = {
	items: [
		{
			label: 'Профиль',
			href: USER_PAGES.PROFILE,
			icon: User,
		},
		{
			label: 'Заказы',
			href: USER_PAGES.ORDERS,
			icon: ShoppingBag,
		},
		{
			label: 'Услуги',
			href: PUBLIC_PAGES.MARKET,
			icon: Store,
		},
		{
			label: 'Избранное',
			href: USER_PAGES.FAVORITES,
			icon: BookHeart,
		},
		{
			label: 'Чат',
			href: USER_PAGES.CHAT(),
			icon: MessageSquareText,
		},
	],
}
