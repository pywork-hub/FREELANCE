import type { IBoxes } from '@/shared/interfaces/box/box.interface'
import {
	HeartHandshake,
	PercentCircle,
	ShieldCheck,
	Wallet,
} from 'lucide-react'

export const HOME_ADVANTAGES_DATA: IBoxes = {
	items: [
		{
			icon: HeartHandshake,
			name: 'Нет необходимости подписывать договор.',
			description:
				'Не тратьте время на бюрократию, доверьтесь профессионалам и сфокусируйтесь на развитии своего бизнеса.',
		},
		{
			icon: ShieldCheck,
			name: 'Оплата на условиях безопасной сделки.',
			description:
				'Абсолютная безопасность. Средства замораживаются до момента подтверждения Вами заказа.',
		},
		{
			icon: Wallet,
			name: 'Гарантированный возврат платежа.',
			description:
				'Получите гарантированный возврат денежных средств в случае неудовлетворенности заказом! Надежность и качество обслуживания - наш приоритет.',
		},
		{
			icon: PercentCircle,
			name: 'Работаем по ценам фриланса.',
			description:
				'Профессиональные IT услуги по цене фриланса. Не ограничивайте себя бюджетом, выбирайте оптимальное решение для вашего бизнеса.',
		},
	],
}
