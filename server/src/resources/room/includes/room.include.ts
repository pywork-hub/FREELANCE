import type { Prisma } from '@prisma/client'

export const roomInclude: Prisma.RoomInclude = {
	messages: {
		include: {
			sender: {
				include: {
					profile: true,
				},
			},
		},
	},
	users: {
		include: {
			profile: true,
		},
	},
}
