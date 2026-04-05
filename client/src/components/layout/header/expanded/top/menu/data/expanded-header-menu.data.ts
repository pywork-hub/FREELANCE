import { PUBLIC_PAGES, USER_PAGES } from '@/constants/url.constants'
import type { IMenu } from '@/shared/interfaces/menu/menu.interface'

export const EXPANDED_HEADER_MENU_DATA: IMenu = {
	items: [
		{
			label: 'Заказы',
			href: USER_PAGES.ORDERS,
		},
		{
			label: 'Услуги',
			href: PUBLIC_PAGES.MARKET,
		},
		{
			label: 'Избранное',
			href: USER_PAGES.FAVORITES,
		},
		{
			label: 'Чат',
			href: USER_PAGES.CHAT(),
		},
	],
}
