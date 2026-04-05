import type { ISeo } from '@/shared/interfaces/seo/seo.interface'
import type { Metadata } from 'next'

export const SEO_METADATA = ({
	title,
	description,
	keywords,
	graphs,
	category,
	url,
}: ISeo): Metadata => {
	const imagesResolutions = [
		{ width: 1200, height: 630 },
		{ width: 1080, height: 1080 },
		{ width: 600, height: 315 },
	]

	const metadata: Metadata = {
		title,
		description,
		keywords,
		category,
	}

	if (graphs) {
		metadata.openGraph = {
			title: graphs.title,
			description: graphs.description,
			url,
			images: graphs.images.map((image, index) => ({
				url: image.url,
				width: imagesResolutions[index].width,
				height: imagesResolutions[index].height,
				alt: image.alt,
			})),
		}
	}

	return metadata
}
