import { PUBLIC_PAGES, USER_PAGES } from '@/constants/url.constants'
import type { IMenu } from '@/shared/interfaces/menu/menu.interface'

export const EXPANDED_HEADER_PROFILE_MENU_DATA: IMenu = {
	items: [
		{
			label: 'Профиль',
			href: USER_PAGES.PROFILE,
		},
		{
			label: 'Помощь',
			href: PUBLIC_PAGES.FAQ,
		},
	],
}
