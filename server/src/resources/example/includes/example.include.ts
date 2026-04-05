import type { Prisma } from '@prisma/client'

export const exampleInclude: Prisma.ExampleInclude = {
	service: true,
	user: {
		include: {
			profile: true,
		},
	},
}