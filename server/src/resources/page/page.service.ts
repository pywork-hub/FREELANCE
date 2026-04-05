import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { blockSelect } from '../block/select/block.select'
import { seoSelect } from '../seo/select/seo.select'
import { PageType } from './enums/page-type.enum'
import { PageInput } from './inputs/page.input'

@Injectable()
export class PageService {
	constructor(private readonly prisma: PrismaService) {}

	async getPage(type: PageType) {
		const block = await this.prisma.block.findUnique({
			where: {
				type,
			},
			select: blockSelect,
		})

		const seo = await this.prisma.seo.findUnique({
			where: {
				type,
			},
			select: seoSelect,
		})

		return {
			seo: seo || null,
			block: block || null,
		}
	}

	async getPageBlock(type: PageType) {
		return this.prisma.block.findUnique({
			where: {
				type,
			},
			select: blockSelect,
		})
	}

	async getPageSeo(type: PageType) {
		return this.prisma.seo.findUnique({
			where: {
				type,
			},
			select: seoSelect,
		})
	}

	async updatePage(type: PageType, input: PageInput) {
		const block = await this.prisma.block.findUnique({
			where: {
				type,
			},
			select: blockSelect,
		})
		const seo = await this.prisma.seo.findUnique({
			where: {
				type,
			},
			select: seoSelect,
		})

		if (input.block) {
			if (block) {
				await this.prisma.block.delete({
					where: {
						type,
					},
				})
			}
			if (input.block.items.length > 0) {
				await this.prisma.block.create({
					data: {
						heading: input.block.heading,
						items: {
							create: input.block.items.map((item) => ({
								heading: item.heading,
								content: item.content,
							})),
						},
						type,
					},
					select: blockSelect,
				})
			}
		}

		if (input.seo) {
			if (seo) {
				await this.prisma.seo.delete({
					where: {
						type,
					},
				})
			}
			await this.prisma.seo.create({
				data: {
					title: input.seo.title,
					description: input.seo.description,
					keywords: input.seo.keywords.map((keyword) => keyword.value),
					graphs: input.seo.graphs
						? {
								create: {
									title: input.seo.graphs.title,
									description: input.seo.graphs.description,
									images:
										input.seo.graphs.images.length > 0
											? {
													create: input.seo.graphs.images.map((image) => ({
														url: image.url,
														alt: image.alt,
													})),
												}
											: undefined,
								},
							}
						: undefined,
					type,
				},
				select: seoSelect,
			})
		}

		return true
	}
}
