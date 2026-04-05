import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryFilters } from 'src/utils/query/query-filters.util'
import { PaginationService } from '../pagination/pagination.service'
import { CatalogService } from '../service/entities/service.entity'
import { attributeInclude } from './includes/attribute.include'
import { AttributeInput } from './inputs/attribute.input'

@Injectable()
export class AttributeService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getFilters(services: CatalogService[]) {
		const allProperties = services.reduce((acc, service) => {
			acc.push(...service.properties)
			return acc
		}, [])

		const uniqueAttributes = [
			...new Set(allProperties.map((property) => property.attributeId)),
		]

		const groupedProperties = uniqueAttributes.map((attributeId) => {
			const propertiesForAttribute = allProperties
				.filter((property) => property.attributeId === attributeId)
				.reduce((acc, current) => {
					const x = acc.find((item) => item.slug === current.slug)
					if (!x) {
						return acc.concat([current])
					} else {
						return acc
					}
				}, [])

			return {
				name: propertiesForAttribute[0].attribute.name,
				slug: generateSlug(propertiesForAttribute[0].attribute.name),
				properties: propertiesForAttribute.map((property) => ({
					name: property.name,
					slug: property.slug,
				})),
			}
		})

		return groupedProperties
	}

	// Admin Place
	async getAll(input: QueryInput) {
		const { createFilter, getSortFilter } = queryFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		const attributes = await this.prisma.attribute.findMany({
			where: createFilter(input),
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			include: {
				properties: true,
			},
		})

		const count = await this.prisma.attribute.count({
			where: createFilter(input),
		})

		return {
			attributes: attributes || [],
			count: count || 0,
		}
	}

	async getAllProperties() {
		return this.prisma.property.findMany({
			include: {
				attribute: true,
			},
		})
	}

	async byId(id: number) {
		const attribute = await this.prisma.attribute.findUnique({
			where: {
				id,
			},
			include: attributeInclude,
		})

		if (!attribute) throw new NotFoundException('Характеристика не найдена.')

		return attribute
	}

	async duplicate(id: number) {
		const attribute = await this.byId(id)
		const name = await this.generateUniqueSlug(attribute.name)

		return this.prisma.attribute.create({
			data: {
				name: name,
				slug: generateSlug(name),
				properties:
					attribute.properties.length > 0
						? {
								connect: attribute.properties.map((property) => ({
									id: property.id,
								})),
							}
						: undefined,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.attribute.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists)
			throw new BadRequestException('Характеристика уже существует.')

		return this.prisma.attribute.create({
			data: {
				name: '',
				slug: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: AttributeInput) {
		const attribute = await this.byId(id)

		const isExists = await this.prisma.attribute.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: attribute.slug,
				},
			},
		})

		if (isExists)
			throw new BadRequestException('Характеристика уже существует.')

		return this.prisma.attribute.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				properties: {
					deleteMany: {},
					create: input.properties.map((property) => ({
						name: property.name,
						slug: generateSlug(property.name),
					})),
				},
			},
		})
	}

	async delete(id: number) {
		return this.prisma.attribute.delete({
			where: {
				id,
			},
		})
	}

	private generateUniqueSlug = async (queriedName: string, number = 1) => {
		const name = `${queriedName}-${number}`
		const isExist = await this.prisma.attribute.findUnique({
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
