import type { Prisma } from '@prisma/client'

export const userInclude: Prisma.UserInclude = {
	profile: true,
	favorites: {
		include: {
			categories: true,
		},
	},
	bots: true
}
