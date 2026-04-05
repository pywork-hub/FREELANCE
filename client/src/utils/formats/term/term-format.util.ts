export const termFormat = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	const remainingHours = hours % 24
	const remainingMinutes = minutes % 60
	const remainingSeconds = seconds % 60

	let result = ''

	if (days > 0) {
		result += `${days} д.`
	}

	if (remainingHours > 0) {
		result += `${result ? ' - ' : ''} ${remainingHours} ч.`
	}

	if (remainingMinutes > 0) {
		result += `${result ? ' - ' : ' '}${remainingMinutes} мин.`
	}

	if (remainingSeconds > 0) {
		result += `${result ? ' - ' : ' '}${remainingSeconds} сек.`
	}

	return result.trim()
}
