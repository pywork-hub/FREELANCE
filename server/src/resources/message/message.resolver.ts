import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import {
	Args,
	Int,
	Mutation,
	Query,
	Resolver,
	Subscription,
} from '@nestjs/graphql'
import { Job } from 'bull'
import { PubSubEngine } from 'graphql-subscriptions'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { OrderActionInput } from '../order/inputs/order.input'
import { OrderService } from '../order/order.service'
import { ServiceOrderInput } from '../service/inputs/service-order.input'
import { ServiceService } from '../service/service.service'
import { CurrentUser } from '../user/decorators/user.decorator'
import { User } from '../user/entities/full/user.entity'
import { UserRole } from '../user/enums/user-role.enum'
import { Message, RoomMessage } from './entities/message.entity'
import { Typing } from './entities/typing.entity'
import { MessageActionInput } from './inputs/message-action.input'
import { OfferInput } from './inputs/offer.input'
import { ReviewOfferInput } from './inputs/review-offer.input'
import { ReviewInput } from './inputs/review.input'
import { TypingInput } from './inputs/typing.input'
import { MessageService } from './message.service'

@Processor('order-queue')
@Resolver()
export class MessageResolver {
	constructor(
		private readonly messageService: MessageService,
		private readonly orderService: OrderService,
		private readonly serviceService: ServiceService,
		@Inject('PUB_SUB') private readonly pubSub: PubSubEngine
	) {}

	@Auth()
	@Query(() => [Message], { name: 'notificationMessages' })
	async getNotificationMessages(@CurrentUser('id') id: number) {
		return this.messageService.getNotificationMessages(id)
	}

	@Subscription(() => Message, {
		nullable: true,
		resolve: (value) => {
			return value.newMessage
		},
	})
	async roomMessages(@Args('roomId', { type: () => Int }) roomId: number) {
		return this.pubSub.asyncIterator(`newMessage.${roomId}`)
	}

	@Subscription(() => Message, {
		nullable: true,
		name: 'userNotification',
		resolve: (value) => {
			return value.newMessage
		},
	})
	async userNotification(@Args('userId', { type: () => Int }) userId: number) {
		return this.pubSub.asyncIterator(`userNotification.${userId}`)
	}

	@Auth()
	@Mutation(() => Message, { name: 'messageAction' })
	async messageAction(
		@Args('data') input: MessageActionInput,
		@CurrentUser() user: User
	) {
		const message = await this.messageService.messageAction(input, user)

		await this.pubSub.publish(`newMessage.${input.roomId}`, {
			newMessage: message,
			type: input.action,
		})

		const client = message.room.users.find((u) => u.id !== user.id)

		if (client) {
			await this.pubSub.publish(`userNotification.${client.id}`, {
				newMessage: message,
				type: input.action,
			})
		}

		return message
	}

	@Subscription(() => Typing, {
		nullable: true,
		resolve: (value) => {
			return {
				isPartnerTyping: value.isPartnerTyping,
			}
		},
	})
	async userTyping(
		@Args('roomId', { type: () => Int }) roomId: number,
		@Args('userId', { type: () => Int }) userId: number
	) {
		return this.pubSub.asyncIterator(`typingStatus.${roomId}.${userId}`)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'toggleTyping' })
	async toggleTyping(
		@CurrentUser('id') userId: number,
		@Args('data') input: TypingInput
	) {
		await this.pubSub.publish(`typingStatus.${input.roomId}.${userId}`, {
			isPartnerTyping: input.isTyping,
		})

		return true
	}

	@Subscription(() => [Int], {
		nullable: true,
		name: 'checkedMessage',
		resolve: (value) => {
			return value
		},
	})
	async checkedMessage(
		@Args('roomId', { type: () => Int }) roomId: number,
		@Args('userId', { type: () => Int }) userId: number
	) {
		return this.pubSub.asyncIterator(`checkedMessage.${roomId}.${userId}`)
	}

	@Auth()
	@Mutation(() => [Int], { name: 'checkMessages' })
	async checkMessages(
		@CurrentUser('id') id: number,
		@Args('roomId', { type: () => Int }) roomId: number,
		@Args('messagesIds', { type: () => [Int] }) messagesIds: number[]
	) {
		await this.messageService.checkMessages(messagesIds)

		await this.pubSub.publish(`checkedMessage.${roomId}.${id}`, messagesIds)

		return [...new Set(messagesIds)]
	}

	@Auth()
	@Mutation(() => Message, { name: 'orderService' })
	async buyService(
		@CurrentUser() user: User,
		@Args('data') input: ServiceOrderInput
	) {
		const message = await this.serviceService.orderService(user, input)

		await this.pubSub.publish(`newMessage.${message.roomId}`, {
			newMessage: message,
		})

		const manager = message.room.users.find((u) => u.id !== user.id)

		if (manager) {
			await this.pubSub.publish(`userNotification.${manager.id}`, {
				newMessage: message,
			})
		}

		return message
	}

	@Auth(UserRole.MANAGER)
	@Mutation(() => Message, { name: 'createReviewOffer' })
	async createReviewOffer(
		@CurrentUser() user: User,
		@Args('data') input: ReviewOfferInput
	) {
		const message = await this.messageService.createReviewOffer(input, user)

		await this.pubSub.publish(`newMessage.${input.roomId}`, {
			newMessage: message,
		})

		const client = message.room.users.find((u) => u.id !== user.id)

		if (client) {
			await this.pubSub.publish(`userNotification.${client.id}`, {
				newMessage: message,
			})
		}

		return message
	}

	@Auth()
	@Mutation(() => Message, { name: 'leftReview' })
	async leftReview(
		@CurrentUser('id') id: number,
		@Args('data') input: ReviewInput
	) {
		const message = await this.messageService.leftReview(input, id)

		await this.pubSub.publish(`newMessage.${input.roomId}`, {
			newMessage: message,
		})

		const manager = message.room.users.find((u) => u.id !== id)

		if (manager) {
			await this.pubSub.publish(`userNotification.${manager.id}`, {
				newMessage: message,
			})
		}

		return message
	}

	@Auth(UserRole.MANAGER)
	@Mutation(() => Message, { name: 'createOffer' })
	async createOffer(
		@Args('data') input: OfferInput,
		@CurrentUser() user: User
	) {
		const message = await this.messageService.createOffer(input, user)

		await this.pubSub.publish(`newMessage.${input.roomId}`, {
			newMessage: message,
		})

		const client = message.room.users.find((u) => u.id !== user.id)

		if (client) {
			await this.pubSub.publish(`userNotification.${client.id}`, {
				newMessage: message,
			})
		}

		return message
	}

	@Auth(UserRole.MANAGER)
	@Mutation(() => Message, { name: 'orderAction' })
	async orderAction(@Args('data') input: OrderActionInput) {
		const message = await this.orderService.orderAction(input)

		await this.pubSub.publish(`newMessage.${message.roomId}`, {
			newMessage: message,
		})

		message.room.users.map(
			async (user) =>
				await this.pubSub.publish(`userNotification.${user.id}`, {
					newMessage: message,
				})
		)

		return message
	}

	@Auth()
	@Mutation(() => [RoomMessage], { name: 'messages' })
	async getMessages(
		@Args('roomId', { type: () => Int }) roomId: number,
		@Args('query') input: QueryInput
	) {
		return this.messageService.getAll(roomId, input)
	}

	@Process('order-expired')
	async expireOrder(job: Job) {
		const { orderId, roomId, userId } = job.data

		const message = await this.orderService.expireOrder(orderId, roomId, userId)

		await this.pubSub.publish(`newMessage.${roomId}`, {
			newMessage: message,
		})

		message.room.users.map(
			async (user) =>
				await this.pubSub.publish(`userNotification.${user.id}`, {
					newMessage: message,
				})
		)

		return message
	}

	@Process('order-delete')
	async deleteOrder(job: Job) {
		const { orderId, messageId, managerId } = job.data

		const message = await this.messageService.deleteOrder(orderId, messageId)

		await this.pubSub.publish(`newMessage.${message.roomId}`, {
			newMessage: message,
		})

		const client = message.room.users.find((u) => u.id !== managerId)

		if (client) {
			await this.pubSub.publish(`userNotification.${client.id}`, {
				newMessage: message,
			})
		}
	}
}
