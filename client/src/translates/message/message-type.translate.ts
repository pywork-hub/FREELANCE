import { MessageType } from '@/__generated__/output'

export const MESSAGE_TYPE_TRANSLATE = {
	[MessageType.Offer]: 'Новое предложение',
	[MessageType.Service]: 'Поступил новый заказ',
	[MessageType.OrderInProcess]: 'Заказ в работе',
	[MessageType.OrderCompleted]: 'Заказ завершен',
	[MessageType.OrderCanceled]: 'Заказ отменен',
	[MessageType.OrderExpired]: 'Срок заказа истек',
	[MessageType.OrderRefunded]: 'Деньги возвращены',
	[MessageType.ReviewOffered]: 'Предложение отзыва',
	[MessageType.ReviewLeft]: 'Заказчик оставил отзыв',
}
