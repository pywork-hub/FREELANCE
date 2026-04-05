export const seoSelect = {
	title: true,
	description: true,
	keywords: true,
	graphs: {
		select: {
			title: true,
			description: true,
			images: {
				select: {
					url: true,
					alt: true,
				},
			},
		},
	},
}

export const nestedSeoSelect = {
	seo: {
		select: seoSelect,
	},
}
