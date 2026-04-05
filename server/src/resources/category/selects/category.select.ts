import type { Prisma } from '@prisma/client'

export const catalogCategorySelect: Prisma.CategorySelect = {
	id: true,
	name: true,
	slug: true,
	coverPath: true,
	visibility: true,
}