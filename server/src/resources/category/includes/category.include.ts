export const categoryInclude = {
	childrens: true,
	parents: true,
	services: {
		include: {
			categories: true,
		},
	},
	seo: {
		include: {
			graphs: {
				include: {
					images: true,
				},
			},
		},
	},
	block: {
		include: {
			items: true
		}
	}
}
