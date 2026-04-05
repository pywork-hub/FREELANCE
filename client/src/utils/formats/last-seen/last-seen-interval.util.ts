export const lastSeenInterval = (lastSeenDate: Date): number => {
	const diff = (Date.now() - lastSeenDate.getTime()) / 1000

	if (diff < 60) {
		return 1000
	} else if (diff < 3600) {
		return 60000
	} else if (diff < 86400) {
		return 3600000
	} else {
		return 86400000
	}
}
