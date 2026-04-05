import type { Prisma } from '@prisma/client'

export const sessionUserSelect: Prisma.UserSelect = {
	id: true,
	profile: {
		select: {
			id: true,
			email: true,
			login: true,
			password: true,
			avatarPath: true,
		},
	},
	favorites: {
		select: {
			slug: true,
		}
	},
	roles: true,
}
