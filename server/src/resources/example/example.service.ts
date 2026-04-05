import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Visibility } from 'src/global/enums/query.enum'
import { QueryFullestInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import { queryFullestFilters } from 'src/utils/query/query-fullest-filters.util'
import { PaginationService } from '../pagination/pagination.service'
import { reviewSelect } from '../review/selects/review.select'
import { exampleInclude } from './includes/example.include'
import { AddExampleInput, ExampleInput } from './inputs/example.input'

@Injectable()
export class ExampleService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryFullestInput) {
		const { createFilter, getSortFilter } = queryFullestFilters()

		const { perPage, skip } = this.paginationService.getPagination(input)

		let filters = createFilter(input)

		const examples = await this.prisma.example.findMany({
			where: filters,
			orderBy: getSortFilter(input.sort),
			skip,
			take: perPage,
			include: {
				review: {
					select: reviewSelect,
				},
			},
		})

		const count = await this.prisma.example.count({
			where: filters,
		})

		return {
			examples: examples || [],
			count: count || 0,
		}
	}

	// Manager Place
	async addExample(input: AddExampleInput) {
		const review = await this.prisma.review.findFirst({
			where: {
				serviceId: input.serviceId,
				userId: input.userId,
			},
		})

		return this.prisma.example.create({
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				coverPath: '',
				imagePath: '',
				url: input.url,
				user: {
					connect: {
						id: input.userId,
					},
				},
				service: {
					connect: {
						id: input.serviceId,
					},
				},
				review: review
					? {
							connect: {
								id: review.id,
							},
						}
					: undefined,
			},
			select: {
				id: true,
			},
		})
	}

	// Admin Place
	async byId(id: number) {
		const example = await this.prisma.example.findUnique({
			where: {
				id,
			},
			include: exampleInclude,
		})

		if (!example) throw new NotFoundException('Пример не найден.')

		return example
	}

	async toggleVisibility(id: number) {
		const example = await this.byId(id)

		return this.prisma.example.update({
			where: {
				id,
			},
			data: {
				visibility:
					example.visibility === Visibility.VISIBLE
						? Visibility.HIDDEN
						: Visibility.VISIBLE,
			},
		})
	}

	async duplicate(id: number) {
		const example = await this.byId(id)
		const name = await this.generateUniqueSlug(example.name)

		return this.prisma.example.create({
			data: {
				name: name,
				slug: generateSlug(name),
				coverPath: example.coverPath,
				imagePath: example.imagePath,
				url: example.url,
				service: example.serviceId
					? {
							connect: {
								id: example.serviceId,
							},
						}
					: undefined,
				user: example.userId
					? {
							connect: {
								id: example.userId,
							},
						}
					: undefined,
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.example.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Пример уже существует.')

		return this.prisma.example.create({
			data: {
				name: '',
				slug: '',
				coverPath: '',
				imagePath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: ExampleInput) {
		const example = await this.byId(id)

		const isExists = await this.prisma.example.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: example.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Пример уже существует.')

		return this.prisma.example.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				coverPath: input.coverPath,
				imagePath: input.imagePath,
				url: input.url,
				service: input.service
					? {
							connect: {
								id: input.service.value,
							},
						}
					: undefined,
				user: input.user
					? {
							connect: {
								id: input.user.value,
							},
						}
					: undefined,
				visibility: Visibility.VISIBLE,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.example.delete({
			where: {
				id,
			},
		})
	}

	private generateUniqueSlug = async (queriedName: string, number = 1) => {
		const name = `${queriedName}-${number}`
		const isExist = await this.prisma.example.findUnique({
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
