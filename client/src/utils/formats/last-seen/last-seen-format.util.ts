export const lastSeenFormat = (date: Date) => {
	const diff = Math.floor(
		(new Date().getTime() - new Date(date).getTime()) / 1000
	)

	if (diff < 60) {
		return `${diff} сек. назад`
	} else if (diff < 3600) {
		const minutes = Math.floor(diff / 60)
		return `${minutes} мин. назад`
	} else if (diff < 86400) {
		const hours = Math.floor(diff / 3600)
		return `${hours} ч. назад`
	} else if (diff < 604800) {
		const days = Math.floor(diff / 86400)
		return `${days} д. назад`
	} else if (diff < 31536000) {
		const weeks = Math.floor(diff / 604800)
		return `${weeks} нед. назад`
	} else {
		const years = Math.floor(diff / 31536000)
		return `${years} г. назад`
	}
}
