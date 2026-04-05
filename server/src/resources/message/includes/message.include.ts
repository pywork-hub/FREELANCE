export const messageInclude = {
	sender: {
		include: {
			profile: true,
		},
	},
	room: {
		include: {
			users: {
				include: {
					profile: true,
					bots: true
				},
			},
		},
	},
}
