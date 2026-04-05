import type { Prisma } from '@prisma/client'

export const attributeInclude: Prisma.AttributeInclude = {
	properties: true,
}