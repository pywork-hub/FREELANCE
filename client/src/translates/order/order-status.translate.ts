import { OrderStatus } from '@/__generated__/output'

export const ORDER_STATUS_TRANSLATE = {
	[OrderStatus.Pending]: 'Не оплачен',
	[OrderStatus.InProcess]: 'В работе',
	[OrderStatus.Completed]: 'Завершен',
	[OrderStatus.Canceled]: 'Отменен',
	[OrderStatus.Expired]: 'Истек',
	[OrderStatus.Refunded]: 'Возвращен',
}
