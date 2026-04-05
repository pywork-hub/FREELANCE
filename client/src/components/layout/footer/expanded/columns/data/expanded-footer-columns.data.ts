import { SITE_NAME } from '@/constants/seo.constants'
import type { IModalState } from '@/shared/interfaces/modal/modal.interface'
import type { IExpandedFooterColumns } from '../interface/expanded-footer-columns.interface'
import { PUBLIC_PAGES } from '@/constants/url.constants'

export const EXPANDED_FOOTER_COLUMNS_DATA = ({
	setIsShow,
}: IModalState): IExpandedFooterColumns => ({
	columns: [
		{
			title: `О ${SITE_NAME}`,
			items: [
				{
					label: 'О проекте',
					href: PUBLIC_PAGES.ABOUT,
				},
				{
					label: 'Политика конфиденциальности',
					href: PUBLIC_PAGES.POLICY,
				},
				{
					label: 'Наши реквизиты',
					href: PUBLIC_PAGES.REQUISITES,
				},
			],
		},
		{
			title: `Полезно`,
			items: [
				{
					label: `Как заказать услуги на ${SITE_NAME}`,
					href: '/#how-to-buy',
				},
				{
					label: `Мобильное приложение`,
					href: '/',
					onClick: () => setIsShow(true),
				},
			],
		},
		{
			title: `Помощь`,
			items: [
				{
					label: 'Вопросы - Ответы',
					href: PUBLIC_PAGES.FAQ,
				},
				{
					label: 'Свяжитесь с нами',
					href: PUBLIC_PAGES.CONTACT,
				},
			],
		},
	],
})
