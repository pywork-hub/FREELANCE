import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ActivityStatus } from '@prisma/client'
import { createWriteStream, ensureDir, unlink } from 'fs-extra'
import { USER_CONSTANTS } from 'src/global/constants/public.constants'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { pipeline } from 'stream/promises'
import { PaginationService } from '../pagination/pagination.service'
import { ServiceQueryInput } from '../service/inputs/service-query.input'
import { ServiceService } from '../service/service.service'
import { UserRole } from './enums/user-role.enum'
import { userInclude } from './includes/user.include'
import { ProfileInput, UserInput } from './inputs/user.input'
import { sessionUserSelect } from './selects/session-user.select'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly serviceService: ServiceService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { createFilter, getSortFilter } = queryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = createFilter(input)

		const users = await this.prisma.user.findMany({
			where: filters,
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			include: {
				profile: true,
				bots: true,
			},
		})

		const count = await this.prisma.user.count({
			where: filters,
		})

		return {
			users,
			count,
		}
	}

	async byId(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: userInclude,
		})

		if (!user) throw new NotFoundException('Пользователь не найден.')

		return user
	}

	async updateOnline(userId: number, type: 'connect' | 'disconnect') {
		return this.prisma.activity.update({
			where: {
				userId,
			},
			data: {
				status:
					type === 'connect' ? ActivityStatus.ONLINE : ActivityStatus.OFFLINE,
				lastSeen: new Date().toISOString(),
			},
			select: {
				status: true,
				lastSeen: true,
			},
		})
	}

	async getOtherManagers(userId: number) {
		const managers = await this.prisma.user.findMany({
			where: {
				id: {
					not: userId,
				},
				roles: {
					hasSome: [UserRole.MANAGER],
				},
			},
			include: userInclude,
		})

		return managers || []
	}

	async getFavorites(userId: number, input: ServiceQueryInput) {
		return this.serviceService.getAll(input, {
			favoriteUsers: {
				some: {
					id: userId,
				},
			},
		})
	}

	async toggleFavorite(userId: number, serviceSlug: string) {
		const currentUser = await this.byId(userId)

		const isExists = currentUser.favorites.some(
			(service) => service.slug === serviceSlug
		)

		const user = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						slug: serviceSlug,
					},
				},
			},
			select: sessionUserSelect,
		})

		return {
			user,
		}
	}

	async updateProfile(userId: number, input: ProfileInput) {
		const oldUser = await this.prisma.user.findFirst({
			where: {
				AND: [
					{
						profile: {
							login: input.login,
						},
					},
					{
						NOT: {
							id: userId,
						},
					},
				],
			},
		})

		if (oldUser)
			throw new BadRequestException(
				'Пользователь с таким логином уже зарегистрирован.'
			)

		const user = await this.byId(userId)

		let newAvatarPath = user.profile.avatarPath

		if (input.avatarFile) {
			if (user.profile.avatarPath !== USER_CONSTANTS.AVATAR) {
				await unlink(`${process.env.CDN_EDGE_PREFIX}${user.profile.avatarPath}`)
			}

			const uploadFolder = `${process.env.CDN_EDGE_PREFIX}/uploads/public/users`

			await ensureDir(uploadFolder)

			const { createReadStream, filename } = await Promise.resolve(
				input.avatarFile
			)
			const readStream = createReadStream()

			const lastDotIndex = filename.lastIndexOf('.')
			const fileExtension = filename.slice(lastDotIndex + 1)
			const fileName = `avatar-${generateSlug(input.login)}.${fileExtension}`
			const filePath = `${uploadFolder}/${fileName}`

			newAvatarPath = `/uploads/public/users/${fileName}`

			await pipeline(readStream, createWriteStream(filePath))
		}

		const updatedUser = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				profile: {
					update: {
						login: input.login,
						avatarPath: newAvatarPath,
					},
				},
			},
			select: sessionUserSelect,
		})

		return {
			user: updatedUser,
		}
	}

	// Admin Place
	async update(id: number, input: UserInput) {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: {
				bots: {
					deleteMany: {},
					create: input.bots.map((bot) => ({
						token: bot.token,
						chatId: bot.chatId,
					})),
				},
				roles: input.roles.map((role) => role.value),
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
}
