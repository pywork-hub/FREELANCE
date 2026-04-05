export const reviewSelect = {
	id: true,
	rating: true,
	comment: true,
	user: {
		select: {
			id: true,
			profile: {
				select: {
					login: true,
					avatarPath: true,
				},
			},
		},
	},
	createdAt: true,
}
