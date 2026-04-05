import {
	YooCheckout,
	type ICreatePayment,
	type ICreateRefund,
} from '@a2seven/yoo-checkout'
import { InjectQueue } from '@nestjs/bull'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { Queue } from 'bull'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { formatTerm } from 'src/utils/formats/format-term.util'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { MessageType } from '../message/enums/message-type.enum'
import { messageInclude } from '../message/includes/message.include'
import { PaginationService } from '../pagination/pagination.service'
import type { ITelegramBot } from '../telegram/interface/telegram.interface'
import { TelegramService } from '../telegram/telegram.service'
import { OrderStatus } from './enums/order-status.enum'
import { OrderActionInput } from './inputs/order.input'
import { CreatePaymentInput, PaymentCaptureInput } from './inputs/payment.input'
import { orderSelect } from './select/order.select'

const checkout = new YooCheckout({
	shopId: process.env.SHOP_ID,
	secretKey: process.env.PAYMENT_TOKEN,
})

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
		private readonly telegramService: TelegramService,
		@InjectQueue('order-queue') private readonly orderExpired: Queue
	) {}

	async getAll(userId: number, input: QueryInput) {
		const { createFilter, getSortFilter } = queryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = createFilter(input)

		const orders = await this.prisma.order.findMany({
			where: {
				...filters,
				status: {
					not: OrderStatus.PENDING,
				},
			},
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			select: orderSelect,
		})

		return (
			orders.map((order) => ({
				id: order.id,
				name: order.name,
				description: order.description,
				total: order.total,
				term: order.term,
				partner: order.users.find((user) => user.id !== userId).profile,
				status: order.status,
				termUpdatedAt: order.termUpdatedAt,
				createdAt: order.createdAt,
			})) || []
		)
	}

	async getPayment(input: CreatePaymentInput) {
		const createPayload: ICreatePayment = {
			amount: {
				value: input.total.toFixed(2),
				currency: 'RUB',
			},
			payment_method_data: {
				type: 'bank_card',
			},
			confirmation: {
				type: 'redirect',
				return_url: input.redirectUrl,
			},
		}

		try {
			const payment = await checkout.createPayment(createPayload)

			return {
				url: payment.confirmation.confirmation_url,
				id: payment.id,
			}
		} catch (error) {
			return {
				url: null,
				id: null,
			}
		}
	}

	async placeOrder(input: PaymentCaptureInput) {
		const paymentId = input.object.id

		const order = await this.prisma.order.update({
			where: {
				paymentId,
			},
			data: {
				status: OrderStatus.IN_PROCESS,
			},
		})

		const createdOrderContent = `<div class='order order__created'>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
			<div class='order__fill'>
			<h2 class='order__name'>Заказ В Работе</h2>
			<p class='order__text'>
				Номер заказа <a class='order__link' href='${process.env.REACT_APP_URL}/orders'>
				${order.id}
			</a>
			</p>
			</div>
		</div>`

		const message = await this.prisma.message.create({
			data: {
				content: createdOrderContent,
				sender: {
					connect: {
						id: order.managerId,
					},
				},
				room: {
					connect: {
						id: order.roomId,
					},
				},
				order: {
					connect: {
						id: order.id,
					},
				},
				type: MessageType.ORDER_IN_PROCESS,
			},
			include: messageInclude,
		})

		await this.orderExpired.add(
			'order-expired',
			{
				orderId: order.id,
				userId: order.managerId,
				roomId: order.roomId,
			},
			{ delay: order.term * 1000, jobId: `order-${order.id}` }
		)

		const manager = message.room.users.find((u) => u.id === order.managerId)

		const bots = manager.bots.map(
			({ chatId, token }): ITelegramBot => ({
				chatId,
				token,
			})
		)

		const partner = message.room.users.find((u) => u.id !== order.managerId)

		const telegramMessage = `<b>Новый заказ (${order.id}) - От: Менеджера ${manager.profile.login} - Для: ${partner.profile.login}</b>\n<b>Название: </b> ${order.name}\n<b>Срок: </b> ${formatTerm(order.term)}\n<b>Цена: </b> ${order.total} ₽\n`

		await this.telegramService.sendTelegramNotification(
			bots,
			telegramMessage,
			partner.profile.login
		)

		return message
	}

	async orderAction(input: OrderActionInput) {
		const { type, orderId, term, userId, managerId } = input

		let order
		const updateData: Prisma.OrderUpdateInput = {
			status: OrderStatus.IN_PROCESS,
		}
		let messageStatus: MessageType = MessageType.ORDER_IN_PROCESS

		switch (type) {
			case 'completed':
				updateData.status = OrderStatus.COMPLETED
				messageStatus = MessageType.ORDER_COMPLETED
				break
			case 'canceled':
				updateData.status = OrderStatus.CANCELED
				messageStatus = MessageType.ORDER_CANCELED
				break
			case 'refunded':
				try {
					order = await this.prisma.order.findUnique({ where: { id: orderId } })
					if (!order) throw new NotFoundException('Заказ не найден.')

					const createRefundPayload: ICreateRefund = {
						payment_id: order.paymentId,
						amount: {
							value: order.total.toFixed(2),
							currency: 'RUB',
						},
					}

					await checkout.createRefund(createRefundPayload)
					updateData.status = OrderStatus.REFUNDED
					messageStatus = MessageType.ORDER_REFUNDED
				} catch (error) {
					throw new BadRequestException(
						'Ошибка при возврате заказа. Узнайте причину в личном кабинете ЮКассы.'
					)
				}
				break
			default:
				if (term) {
					updateData.term = term
					updateData.termUpdatedAt = new Date()
				}
		}

		order = await this.prisma.order.update({
			where: { id: orderId },
			data: updateData,
		})

		const statusTextMap = {
			completed: 'Завершен',
			canceled: 'Отменен',
			refunded: 'Возвращен',
			inProcess: 'В Работе',
		}

		const svgIconsMap = {
			completed: 'package-check',
			canceled: 'package-x',
			refunded: 'hand-coins',
			inProcess: 'shopping-bag',
		}

		const content = `<div class='order order__${type}'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${svgIconsMap[type]}"></svg>
        <div class='order__fill'>
            <h2 class='order__name'>Заказ ${statusTextMap[type]}</h2>
            <p class='order__text'>
                Номер заказа <a class='order__link' href='${process.env.REACT_APP_URL}/orders'>
                    ${order.id}
                </a>
            </p>
        </div>
    </div>`

		const room = await this.prisma.room.findFirst({
			where: {
				AND: [
					{ users: { some: { id: userId } } },
					{ users: { some: { id: managerId } } },
				],
			},
		})

		if (!room) throw new BadRequestException('Чат не найден.')

		const message = await this.prisma.message.create({
			data: {
				content,
				sender: { connect: { id: managerId } },
				room: { connect: { id: room.id } },
				order: { connect: { id: order.id } },
				type: messageStatus,
			},
			include: messageInclude,
		})

		const manager = message.room.users.find((u) => u.id === managerId)
		const bots = manager.bots.map(({ chatId, token }) => ({ chatId, token }))
		const partner = message.room.users.find((u) => u.id !== managerId)

		const telegramMessage = `
        <b>Заказ (${order.id}) ${statusTextMap[type]} - От: Менеджера ${manager.profile.login} - Для: ${partner.profile.login}</b>\n
        <b>Название: </b> ${order.name}\n
        <b>Срок: </b> ${formatTerm(order.term)}\n
        <b>Цена: </b> ${order.total} ₽\n`

		await this.telegramService.sendTelegramNotification(
			bots,
			telegramMessage,
			partner.profile.login
		)

		const job = await this.orderExpired.getJob(`order-${order.id}`)
		await job?.remove()

		if (type === 'inProcess' && term) {
			await this.orderExpired.add(
				'order-expired',
				{ orderId: order.id, userId: managerId, roomId: room.id },
				{ delay: term * 1000, jobId: `order-${order.id}` }
			)
		}

		return message
	}

	async expireOrder(orderId: number, roomId: number, userId: number) {
		const order = await this.prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				status: OrderStatus.EXPIRED,
			},
		})

		const expiredOrderContent = `<div class='order order__expired'>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
	<div class='order__fill'>
	<h2 class='order__name'>Срок Заказа Истек</h2>
	<p class='order__text'>
		Номер заказа <a class='order__link' href='${process.env.REACT_APP_URL}/orders'>
			${order.id}
		</a>
	</p>
	</div>
</div>`

		const message = await this.prisma.message.create({
			data: {
				content: expiredOrderContent,
				sender: {
					connect: {
						id: userId,
					},
				},
				room: {
					connect: {
						id: roomId,
					},
				},
				order: {
					connect: {
						id: order.id,
					},
				},
				type: MessageType.ORDER_EXPIRED,
			},
			include: messageInclude,
		})

		const manager = message.room.users.find((u) => u.id === userId)
		const bots = manager.bots.map(
			({ chatId, token }): ITelegramBot => ({
				chatId,
				token,
			})
		)

		const partner = message.room.users.find((u) => u.id !== manager.id)

		const telegramMessage = `<b>Order (${order.id}) Expired - From: Manager ${manager.profile.login} - To: ${partner.profile.login}</b>\n<b>Name: </b> ${order.name}\n<b>Term: </b> ${formatTerm(order.term)}\n<b>Price: </b> $${order.total}\n`

		await this.telegramService.sendTelegramNotification(
			bots,
			telegramMessage,
			partner.profile.login
		)

		return message
	}
}
