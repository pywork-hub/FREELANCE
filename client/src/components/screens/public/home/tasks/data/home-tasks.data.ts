import { SITE_NAME } from '@/constants/seo.constants'
import type { ITasks } from '@/shared/interfaces/task/task.interface'
import {
	CircleDollarSign,
	MessageSquareText,
	PackageCheck,
	ShoppingBag,
} from 'lucide-react'

export const HOME_TASKS_DATA: ITasks = {
	items: [
		{
			icon: ShoppingBag,
			name: 'Выберите услугу',
			description: `Платформа <span>${SITE_NAME}</span> предлагает широкий ассортимент услуг, предоставляемых опытными профессионалами. Вы найдете множество вариантов на любой вкус и потребность.`,
		},
		{
			icon: MessageSquareText,
			name: 'Свяжитесь с менеджером',
			description:
				'Нажмите <span>Заказать Услугу</span>, выберите количество, и мы создадим чат с менеджером для обсуждения ваших требований и получения совета. Затем менеджер отправит ссылку для оплаты.',
		},
		{
			icon: CircleDollarSign,
			name: 'Оплатите',
			description:
				'Оплатите услуги по договоренности с менеджером. Деньги удерживаются сервисом до вашего одобрения проекта, затем переводятся профессионалу.',
		},
		{
			icon: PackageCheck,
			name: 'Получите результат',
			description:
				'Мы гарантируем возврат 100% ваших средств, если заказ не будет выполнен. Ваши деньги защищены, и в случае невыполнения заказа вы получите полное возмещение.',
		},
	],
}
