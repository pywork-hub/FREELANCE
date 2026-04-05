import { Injectable } from '@nestjs/common'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { queryRoomFilters } from 'src/utils/query/query-room-filters.util'
import { PaginationService } from '../pagination/pagination.service'
import { CurrentRoom, UserRoom } from './entities/user-rooms.entity'
import { ChangeRoomManagerInput } from './inputs/change-room-manager.input'

@Injectable()
export class RoomService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(userId: number, input: QueryInput) {
		const { createFilter, getSortFilter } = queryRoomFilters(userId)

		const { perPage, skip } = this.paginationService.getPagination(input)

		const rooms = await this.prisma.room.findMany({
			where: {
				AND: [
					createFilter(input),
					{
						users: {
							some: {
								id: userId,
							},
						},
					},
				],
			},
			select: {
				id: true,
				messages: {
					orderBy: {
						createdAt: 'desc',
					},
					select: {
						id: true,
						content: true,
						type: true,
						createdAt: true,
						updatedAt: true,
						senderId: true,
						isChecked: true,
						status: true,
					},
					take: 1,
				},
				users: {
					where: {
						id: {
							not: userId,
						},
					},
					select: {
						id: true,
						profile: {
							select: {
								login: true,
								avatarPath: true,
							},
						},
						activity: {
							select: {
								status: true,
								lastSeen: true,
							},
						},
					},
				},
			},
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
		})

		if (rooms.length === 0) return []

		rooms.sort((a, b) => {
			const aTimestamp = a.messages.length
				? new Date(a.messages[0].createdAt).getTime()
				: 0
			const bTimestamp = b.messages.length
				? new Date(b.messages[0].createdAt).getTime()
				: 0
			return bTimestamp - aTimestamp
		})

		return rooms.map((room) => ({
			id: room.id,
			partner: {
				id: room.users[0].id,
				profile: room.users[0].profile,
				activity: room.users[0].activity,
			},
			...(room.messages[0] && {
				lastMessage: {
					id: room.messages[0].id,
					content: room.messages[0].content,
					senderId: room.messages[0].senderId,
					type: room.messages[0].type,
					isChecked: room.messages[0].isChecked,
					status: room.messages[0].status,
					updatedAt: room.messages[0].updatedAt,
					createdAt: room.messages[0].createdAt,
				},
			}),
		})) as UserRoom[]
	}

	async byPartnerLogin(
		currentUserLogin: string,
		partnerLogin: string,
		input: QueryInput
	) {
		const { createFilter, getSortFilter } = queryFilters()
		const { perPage, skip } = this.paginationService.getPagination(input)

		const partnerLoginDecoded = decodeURIComponent(partnerLogin)
		const room = await this.prisma.room.findFirst({
			where: {
				users: {
					some: {
						profile: {
							login: currentUserLogin,
						},
					},
				},
				AND: {
					users: {
						some: {
							profile: {
								login: partnerLoginDecoded,
							},
						},
					},
				},
			},
			select: {
				id: true,
				messages: {
					where: createFilter(input),
					skip,
					take: perPage,
					orderBy: getSortFilter(input.sort),
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
				},
				users: {
					where: {
						profile: {
							login: { not: currentUserLogin },
						},
					},
					select: {
						id: true,
						profile: {
							select: {
								login: true,
								avatarPath: true,
							},
						},
						activity: {
							select: {
								status: true,
								lastSeen: true,
							},
						},
					},
				},
			},
		})

		return room
			? ({
					id: room.id,
					partner: {
						id: room.users[0].id,
						profile: room.users[0].profile,
						activity: {
							status: room.users[0].activity.status,
							lastSeen: room.users[0].activity.lastSeen,
						},
					},
					messages: room.messages,
				} as CurrentRoom)
			: null
	}

	async changeManager(userId: number, input: ChangeRoomManagerInput) {
		await this.prisma.room.update({
			where: {
				id: input.roomId,
			},
			data: {
				users: {
					disconnect: {
						id: userId,
					},
					connect: {
						id: input.managerId,
					},
				},
			},
		})

		return true
	}

	async delete(roomId: number) {
		return this.prisma.room.delete({
			where: {
				id: roomId,
			},
		})
	}
}
