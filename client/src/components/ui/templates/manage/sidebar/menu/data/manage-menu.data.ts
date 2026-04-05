import { PageType } from '@/__generated__/output'
import { ADMIN_EDITS, ADMIN_PAGES } from '@/constants/url.constants'
import type { IMenu } from '@/shared/interfaces/menu/menu.interface'

export const MANAGE_MENU_DATA: IMenu = {
	items: [
		{
			label: 'Аналитика',
			href: ADMIN_PAGES.ANALYTICS,
		},
		{
			label: 'Пользователи',
			href: ADMIN_PAGES.USERS,
		},
		{
			label: 'Категории',
			href: ADMIN_PAGES.CATEGORIES,
		},
		{
			label: 'Примеры',
			href: ADMIN_PAGES.EXAMPLES,
		},
		{
			label: 'Услуги',
			href: ADMIN_PAGES.SERVICES,
		},
		{
			label: 'Характеристики',
			href: ADMIN_PAGES.ATTRIBUTES,
		},
		{
			label: 'Обращения',
			href: ADMIN_PAGES.REQUESTS,
		},
		{
			label: 'Главная',
			href: ADMIN_EDITS.PAGE(PageType.Home),
		},
		{
			label: 'Маркет',
			href: ADMIN_EDITS.PAGE(PageType.Market),
		},
		{
			label: 'E-mail Рассылки',
			href: ADMIN_PAGES.NEWSLETTER,
		},
	],
}
