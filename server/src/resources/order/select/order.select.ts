export const orderSelect = {
	id: true,
	name: true,
	description: true,
	total: true,
	term: true,
	users: {
		select: {
			id: true,
			profile: {
				select: {
					login: true,
					avatarPath: true,
					userId: true,
				},
			},
		},
	},
	status: true,
	termUpdatedAt: true,
	createdAt: true,
}
