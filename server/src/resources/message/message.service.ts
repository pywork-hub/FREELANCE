import { InjectQueue } from '@nestjs/bull'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { formatTerm } from 'src/utils/formats/format-term.util'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { OrderStatus } from '../order/enums/order-status.enum'
import { OrderService } from '../order/order.service'
import { PaginationService } from '../pagination/pagination.service'
import type { ITelegramBot } from '../telegram/interface/telegram.interface'
import { TelegramService } from '../telegram/telegram.service'
import { User } from '../user/entities/full/user.entity'
import { UserRole } from '../user/enums/user-role.enum'
import { MessageStatus } from './enums/message-status.enum'
import { MessageType } from './enums/message-type.enum'
import { messageInclude } from './includes/message.include'
import { MessageActionInput } from './inputs/message-action.input'
import { OfferInput } from './inputs/offer.input'
import { ReviewOfferInput } from './inputs/review-offer.input'
import { ReviewInput } from './inputs/review.input'

@Injectable()
export class MessageService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly orderService: OrderService,
		private readonly paginationService: PaginationService,
		private readonly telegramService: TelegramService,
		@InjectQueue('order-queue') private readonly orderDeleted: Queue
	) {}

	async getAll(roomId: number, input: QueryInput) {
		const { getSortFilter } = queryFilters()
		const { perPage, skip } = this.paginationService.getPagination(input)

		const messages = await this.prisma.message.findMany({
			where: {
				roomId,
			},
			select: {
				id: true,
				content: true,
				sender: {
					select: {
						profile: {
							select: {
								login: true,
								avatarPath: true,
							},
						},
					},
				},
				isChecked: true,
				type: true,
				status: true,
				updatedAt: true,
				createdAt: true,
			},
			skip,
			take: perPage,
			orderBy: getSortFilter(input.sort),
		})

		return messages || []
	}

	async getNotificationMessages(userId: number) {
		return this.prisma.message.findMany({
			where: {
				isChecked: false,
				room: {
					users: {
						some: {
							id: userId,
						},
					},
				},
				senderId: {
					not: userId,
				},
			},
			include: messageInclude,
			orderBy: {
				createdAt: 'desc',
			},
		})
	}

	async messageAction(input: MessageActionInput, user: User) {
		const isPost = input.action === MessageStatus.POSTED
		const isEdit = input.action === MessageStatus.EDITED
		const isDelete = input.action === MessageStatus.DELETED

		let message = null

		if (isPost) {
			message = await this.prisma.message.create({
				data: {
					content: input.content,
					sender: {
						connect: {
							id: user.id,
						},
					},
					room: {
						connect: {
							id: input.roomId,
						},
					},
				},
				include: messageInclude,
			})
		} else {
			const data = isEdit
				? {
						content: input.content,
						status: MessageStatus.EDITED,
					}
				: {
						isChecked: true,
						status: MessageStatus.DELETED,
					}
			message = await this.prisma.message.update({
				where: {
					id: input.messageId,
				},
				data,
				include: messageInclude,
			})
		}

		const isNotUser =
			user.roles.includes(UserRole.MANAGER) ||
			user.roles.includes(UserRole.ADMIN)

		if (!isNotUser) {
			const manager = message.room.users.find((u) => u.id !== user.id)

			const bots = manager.bots.map(
				({ chatId, token }): ITelegramBot => ({
					chatId,
					token,
				})
			)

			const defaultTelegramMessage =
				`<b>${manager.profile.login}-у - От: ${user.profile.login}</b>\n` +
				`${message.content}\n`

			const telegramMessage = isEdit
				? `<b>Сообщение было изменено</b>\n` + defaultTelegramMessage
				: isDelete
					? `<b>Сообщение было удалено</b>\n` + defaultTelegramMessage
					: defaultTelegramMessage

			await this.telegramService.sendTelegramNotification(
				bots,
				telegramMessage,
				user.profile.login
			)
		}

		return message
	}

	async createReviewOffer(input: ReviewOfferInput, manager: User) {
		const content = `<div class='review review__offer'>
								<p class='review__text'>
								Пожалуйста, оставьте отзыв о нашей услуге — ваше мнение очень важно для нас.
								</p>
								<button class='review__opener' data-id="${input.serviceId}">
									Оставить
								</button>
						</div>`

		const message = await this.prisma.message.create({
			data: {
				content,
				sender: {
					connect: {
						id: manager.id,
					},
				},
				room: {
					connect: {
						id: input.roomId,
					},
				},
				type: MessageType.REVIEW_OFFERED,
			},
			include: messageInclude,
		})

		return message
	}

	async leftReview(input: ReviewInput, userId: number) {
		const existReview = await this.prisma.review.findFirst({
			where: {
				serviceId: input.serviceId,
				userId,
			},
		})

		if (existReview)
			throw new BadRequestException('Вы уже оставили отзыв. Спасибо!')

		const currentService = await this.prisma.service.findUnique({
			where: { id: input.serviceId },
			include: {
				reviews: {
					select: { rating: true },
				},
			},
		})

		const totalReviews = currentService.reviews.length
		const currentTotalRating = currentService.reviews.reduce(
			(sum, review) => sum + review.rating,
			0
		)
		const newTotalRating = currentTotalRating + input.rating
		const newAverageRating = newTotalRating / (totalReviews + 1)
		const limitedAverageRating = Number(newAverageRating.toFixed(1))

		const review = await this.prisma.review.create({
			data: {
				rating: input.rating,
				comment: input.comment,
				user: { connect: { id: userId } },
				service: {
					connect: {
						id: input.serviceId,
					},
				},
			},
		})

		await this.prisma.service.update({
			where: { id: input.serviceId },
			data: {
				averageRating: limitedAverageRating,
				reviews: {
					connect: {
						id: review.id,
					},
				},
			},
		})

		const example = await this.prisma.example.findFirst({
			where: {
				userId,
				serviceId: input.serviceId,
			},
		})

		if (example) {
			await this.prisma.example.update({
				where: {
					id: example.id,
				},
				data: {
					review: {
						connect: {
							id: review.id
						}
					}
				},
			})
		}

		const content = `<div class="review review__left">
				<div class="review__top">
					<h2 class="review__name">Благодарим вас за ваш отзыв</h2>
				</div>
				<div class="review__content">
				<div class='review__head'>
					<span class='review__label'>
						Ваш отзыв
					</span>
				<div class="review__rating">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-star"
						>
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
						</svg>
						<span>${input.rating}.0</span>
					</div>
				</div>
				<div class='review__comment'>
					${input.comment}
				</div>
				</div>
			</div>`

		const room = await this.prisma.room.findUnique({
			where: {
				id: input.roomId,
			},
			select: {
				users: {
					select: {
						id: true,
					},
				},
			},
		})

		const { id: managerId } = room.users.find((u) => u.id !== userId)

		const message = await this.prisma.message.create({
			data: {
				content,
				sender: {
					connect: {
						id: managerId,
					},
				},
				room: {
					connect: {
						id: input.roomId,
					},
				},
				type: MessageType.REVIEW_LEFT,
			},
			include: messageInclude,
		})

		return message
	}

	async createOffer(input: OfferInput, manager: User) {
		const payment = await this.orderService.getPayment({
			total: input.price,
			redirectUrl: `${process.env.REACT_APP_URL}/thanks`,
		})

		if (!payment.url || !payment.id)
			throw new BadRequestException('Произошла ошибка при создании платежа.')

		const content = `<div class='offer'>
							<div class='offer__top'>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
								<h2 class='offer__name'>${input.name}</h2>
							</div>
							<div class='offer__content'>${input.description}</div>
							<div class='offer__bottom'>
								<span class='offer__term'>${formatTerm(input.term)}</span>
								<a href='${payment.url}' class='offer__payment' target='_blank'>
									Заказ - ${input.price} ₽
								</a>
							</div>
						</div>`

		const message = await this.prisma.message.create({
			data: {
				content,
				sender: {
					connect: {
						id: manager.id,
					},
				},
				room: {
					connect: {
						id: input.roomId,
					},
				},
				type: MessageType.OFFER,
			},
			include: messageInclude,
		})

		const partner = message.room.users.find((u) => u.id !== manager.id)

		const existingOrder = await this.prisma.order.findFirst({
			where: {
				status: OrderStatus.PENDING,
				userId: partner.id,
				roomId: message.roomId,
			},
			select: {
				id: true,
			},
		})

		if (existingOrder) {
			const updatedOrder = await this.prisma.order.update({
				where: {
					id: existingOrder.id,
				},
				data: {
					name: input.name,
					slug: generateSlug(input.name),
					description: input.description,
					term: input.term,
					total: input.price,
					paymentId: payment.id,
					managerId: manager.id,
				},
				select: {
					id: true,
				},
			})

			const job = await this.orderDeleted.getJob(`order-${updatedOrder.id}`)
			await job?.remove()
		} else {
			const order = await this.prisma.order.create({
				data: {
					name: input.name,
					slug: generateSlug(input.name),
					description: input.description,
					term: input.term,
					total: input.price,
					paymentId: payment.id,
					users: {
						connect: [{ id: partner.id }, { id: manager.id }],
					},
					managerId: manager.id,
					userId: partner.id,
					roomId: message.roomId,
				},
			})

			await this.orderDeleted.add(
				'order-delete',
				{
					orderId: order.id,
					messageId: message.id,
					managerId: manager.id,
				},
				{ delay: 86400 * 1000, jobId: `order-${order.id}` }
			)
		}

		const bots = manager.bots.map(
			({ chatId, token }): ITelegramBot => ({
				chatId,
				token,
			})
		)

		const telegramMessage = `
		<b>Создано предложение - От: Менеджера ${manager.profile.login} - Для: ${partner.profile.login}</b>\n<b>Название: </b> ${input.name}\n<b>Срок: </b> ${formatTerm(input.term)}\n<b>Цена: </b> ${input.price} ₽\n`

		await this.telegramService.sendTelegramNotification(
			bots,
			telegramMessage,
			partner.profile.login
		)

		return message
	}

	async checkMessages(messagesIds: number[]) {
		await this.prisma.message.updateMany({
			where: {
				id: {
					in: messagesIds.map((id) => id),
				},
			},
			data: {
				isChecked: true,
			},
		})
	}

	async deleteOrder(orderId: number, messageId: number) {
		await this.prisma.order.delete({
			where: {
				id: orderId,
				status: OrderStatus.PENDING,
			},
		})

		const message = await this.prisma.message.update({
			where: {
				id: messageId,
			},
			data: {
				status: MessageStatus.DELETED,
			},
			include: messageInclude,
		})

		return message
	}
}
