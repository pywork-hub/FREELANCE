export const catalogServiceSelect = {
	id: true,
	name: true,
	slug: true,
	fromPrice: true,
	fromSalePrice: true,
	fromTerm: true,
	excerpt: true,
	coverPath: true,
	videoPath: true,
	categories: {
		select: {
			name: true,
			slug: true,
		},
	},
	properties: {
		select: {
			name: true,
			slug: true,
			attribute: {
				select: {
					name: true,
				},
			},
			attributeId: true,
		},
	},
	reviews: {
		select: {
			rating: true,
			comment: true,
			createdAt: true,
		},
	},
	averageRating: true,
	visibility: true,
}
