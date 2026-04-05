import { SITE_NAME } from '@/constants/seo.constants'
import type { IStats } from '@/shared/interfaces/stats/stats.interface'

export const HOME_STATS_DATA: IStats = {
	items: [
		{
			image: {
				src: '/images/global/logo.svg',
				width: 165,
				height: 35,
				alt: SITE_NAME,
			},
			number: 0,
			description: 'Платформа для IT-услуг.',
		},
		{
			number: 347,
			description: 'Активные заказы.',
		},
		{
			number: 51347,
			description: `Проекты в истории ${SITE_NAME}.`,
		},
		{
			number: 763,
			description: 'Новые проекты за эту неделю.',
		},
	],
}
