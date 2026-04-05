import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Visibility } from 'src/global/enums/query.enum'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryServiceFilters } from 'src/utils/query/query-service-filters.util'
import { MessageType } from '../message/enums/message-type.enum'
import { messageInclude } from '../message/includes/message.include'
import { PaginationService } from '../pagination/pagination.service'
import { reviewSelect } from '../review/selects/review.select'
import type { ITelegramBot } from '../telegram/interface/telegram.interface'
import { TelegramService } from '../telegram/telegram.service'
import { User } from '../user/entities/full/user.entity'
import { UserRole } from '../user/enums/user-role.enum'
import { sessionUserSelect } from '../user/selects/session-user.select'
import { AllServices } from './entities/service.entity'
import { serviceInclude } from './includes/service.include'
import { ServiceOrderInput } from './inputs/service-order.input'
import { ServiceQueryInput } from './inputs/service-query.input'
import { ServiceInput } from './inputs/service.input'
import { catalogServiceSelect } from './selects/service.select'

@Injectable()
export class ServiceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
		private readonly telegramService: TelegramService
	) {}

	async getAll(input: ServiceQueryInput, query?: object) {
		const { createFilter, createOrderBy } = queryServiceFilters()
		const { perPage, skip } = this.paginationService.getPagination(input)

		let filters = createFilter(input)
		if (query) {
			filters = {
				AND: [filters, query],
			}
		}

		const services = await this.prisma.service.findMany({
			where: filters,
			orderBy: createOrderBy(input),
			skip,
			take: perPage,
			select: catalogServiceSelect,
		})

		const count = await this.prisma.service.count({
			where: filters,
		})

		return {
			services: services || [],
			count: count || 0,
		} as AllServices
	}

	async getAllForFilters(input: ServiceQueryInput, query?: object) {
		const { createFilter, createOrderBy } = queryServiceFilters()

		let filters = createFilter(input)
		if (query) {
			filters = {
				AND: [filters, query],
			}
		}

		const services = await this.prisma.service.findMany({
			where: filters,
			orderBy: createOrderBy(input),
			select: {
				fromPrice: true,
				fromSalePrice: true,
				fromTerm: true,
				properties: {
					select: {
						name: true,
						slug: true,
						attribute: {
							select: {
								name: true,
							},
						},
						attributeId: true,
					},
				},
			},
		})

		return {
			services: services || [],
		}
	}

	async bySlug(slug: string) {
		const service = await this.prisma.service.findUnique({
			where: {
				slug,
				visibility: Visibility.VISIBLE,
			},
			include: {
				...serviceInclude,
				examples: {
					include: {
						review: {
							select: reviewSelect,
						},
					},
				},
				reviews: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 3,
					include: {
						user: {
							include: {
								profile: true,
							},
						},
					},
				},
				_count: {
					select: {
						reviews: true,
					},
				},
			},
		})

		const similarServices = await this.prisma.service.findMany({
			where: {
				slug: {
					not: service.slug,
				},
				categories: {
					some: {
						slug: {
							in: service.categories.map((category) => category.slug),
						},
					},
				},
				visibility: Visibility.VISIBLE,
			},
			include: serviceInclude,
		})

		return {
			service: service || null,
			similarServices: similarServices || [],
			reviewsCount: service?._count?.reviews || 0,
		}
	}

	async orderService(user: User, input: ServiceOrderInput) {
		if (
			user.roles.includes(UserRole.ADMIN) ||
			user.roles.includes(UserRole.MANAGER)
		)
			throw new BadRequestException(
				'Пожалуйста, войдите как пользователь, чтобы заказать услугу.'
			)

		let room
		room = await this.prisma.room.findFirst({
			where: {
				users: {
					some: {
						id: user.id,
					},
				},
			},
			select: {
				id: true,
				users: {
					where: {
						id: { not: user.id },
					},
					select: {
						profile: {
							select: {
								login: true,
								avatarPath: true,
							},
						},
					},
				},
			},
		})

		if (!room) {
			const managers = await this.prisma.user.findMany({
				where: {
					id: {
						not: user.id,
					},
					roles: {
						hasSome: [UserRole.MANAGER],
					},
				},
				select: sessionUserSelect,
			})

			if (managers.length === 0) {
				throw new NotFoundException(
					'В данный момент, все менеджеры заняты, попробуйте через 5 минут.'
				)
			}

			const randomIndex = Math.floor(Math.random() * managers.length)
			const randomManager = managers[randomIndex]

			room = await this.prisma.room.create({
				data: {
					users: {
						connect: [{ id: user.id }, { id: randomManager.id }],
					},
				},
				include: {
					users: {
						include: {
							profile: true,
						},
					},
				},
			})
		}

		const service = await this.prisma.service.update({
			where: {
				slug: input.serviceSlug,
			},
			data: {
				orderTimes: {
					increment: 1,
				},
			},
		})

		const content = `Здравствуйте. Услуга: <a href='${process.env.REACT_APP_URL}/service/${service.slug}'>${service.name}</a>, Количество: ${input.quantity}`

		const message = await this.prisma.message.create({
			data: {
				content,
				room: {
					connect: {
						id: room.id,
					},
				},
				sender: {
					connect: {
						id: user.id,
					},
				},
				type: MessageType.SERVICE,
			},
			include: messageInclude,
		})

		const manager = message.room.users.find((u) => u.id !== user.id)

		const bots = manager.bots.map(
			({ chatId, token }): ITelegramBot => ({
				chatId,
				token,
			})
		)

		const telegramMessage =
			`<b>Новый заказ</b>\n` +
			`<b>От: ${user.profile.login}</b> - Для: ${manager.profile.login}\n` +
			`${message.content}\n`

		await this.telegramService.sendTelegramNotification(
			bots,
			telegramMessage,
			user.profile.login
		)

		return message
	}

	// Admin Place
	async byId(id: number) {
		const service = await this.prisma.service.findUnique({
			where: {
				id,
			},
			include: {
				...serviceInclude,
				examples: true,
			},
		})

		if (!service) throw new NotFoundException('Услуга не найдена.')

		return service
	}

	async toggleVisibility(id: number) {
		const service = await this.byId(id)

		return this.prisma.service.update({
			where: {
				id,
			},
			data: {
				visibility:
					service.visibility === Visibility.VISIBLE
						? Visibility.HIDDEN
						: Visibility.VISIBLE,
			},
		})
	}

	async duplicate(id: number) {
		const service = await this.byId(id)
		const name = await this.generateUniqueSlug(service.name)

		return this.prisma.service.create({
			data: {
				name: name,
				slug: generateSlug(name),
				fromPrice: service.fromPrice,
				fromSalePrice: service.fromSalePrice,
				fromTerm: service.fromTerm,
				excerpt: service.excerpt,
				description: service.description,
				coverPath: service.coverPath,
				videoPath: service.videoPath,
				examples:
					service.examples.length > 0
						? {
								connect: service.examples.map((example) => ({
									id: example.id,
								})),
							}
						: undefined,
				categories:
					service.categories.length > 0
						? {
								connect: service.categories.map((category) => ({
									id: category.id,
								})),
							}
						: undefined,
				properties:
					service.properties.length > 0
						? {
								connect: service.properties.map((property) => ({
									id: property.id,
								})),
							}
						: undefined,
				seo: service.seo
					? {
							create: {
								title: service.seo.title,
								description: service.seo.description,
								keywords: service.seo.keywords,
								graphs: service.seo.graphs
									? {
											create: {
												title: service.seo.graphs.title,
												description: service.seo.graphs.description,
												images:
													service.seo.graphs.images.length > 0
														? {
																create: service.seo.graphs.images.map(
																	(image) => ({
																		url: image.url,
																		alt: image.alt,
																	})
																),
															}
														: undefined,
											},
										}
									: undefined,
							},
						}
					: undefined,
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.service.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Услуга уже существует.')

		return this.prisma.service.create({
			data: {
				name: '',
				slug: '',
				fromPrice: 100,
				fromTerm: 86400,
				excerpt: '',
				description: '',
				coverPath: '',
				videoPath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: ServiceInput) {
		const service = await this.byId(id)

		const isExists = await this.prisma.service.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: service.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Услуга уже существует.')

		return this.prisma.service.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				fromPrice: input.fromPrice,
				fromSalePrice: input.fromSalePrice ? input.fromSalePrice : null,
				fromTerm: input.fromTerm,
				excerpt: input.excerpt,
				description: input.description,
				coverPath: input.coverPath,
				videoPath: input.videoPath,
				examples:
					input.examples.length > 0
						? {
								disconnect: service.examples.map((example) => ({
									id: example.id,
								})),
								connect: input.examples.map((example) => ({
									id: example.value,
								})),
							}
						: undefined,
				categories:
					input.categories.length > 0
						? {
								disconnect: service.categories.map((category) => ({
									id: category.id,
								})),
								connect: input.categories.map((category) => ({
									id: category.value,
								})),
							}
						: undefined,
				properties:
					input.properties.length > 0
						? {
								disconnect: service.properties.map((property) => ({
									id: property.id,
								})),
								connect: input.properties.map((property) => ({
									id: property.value,
								})),
							}
						: undefined,
				seo: {
					delete: service.seo ? true : false,
					create: input.seo
						? {
								title: input.seo.title,
								description: input.seo.description,
								keywords: input.seo.keywords.map((keyword) => keyword.value),
								graphs: input.seo.graphs
									? {
											create: {
												title: input.seo.graphs.title,
												description: input.seo.graphs.description,
												images:
													input.seo.graphs.images.length > 0
														? {
																create: input.seo.graphs.images.map(
																	(image) => ({
																		url: image.url,
																		alt: image.alt,
																	})
																),
															}
														: undefined,
											},
										}
									: undefined,
							}
						: undefined,
				},
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.service.delete({
			where: {
				id,
			},
		})
	}

	private generateUniqueSlug = async (queriedName: string, number = 1) => {
		const name = `${queriedName}-${number}`
		const isExist = await this.prisma.service.findUnique({
			where: {
				slug: generateSlug(name),
			},
		})

		if (!isExist) {
			return name
		} else {
			return this.generateUniqueSlug(queriedName, number + 1)
		}
	}
}
