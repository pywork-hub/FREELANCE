export const formatTerm = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	const remainingHours = hours % 24
	const remainingMinutes = minutes % 60
	const remainingSeconds = seconds % 60

	let result = ''

	if (days > 0) {
		result += `${days} ${days !== 1 ? 'дней' : 'день'}`
	}

	if (remainingHours > 0) {
		result += `${result ? ' - ' : ''} ${remainingHours} ${remainingHours !== 1 ? 'часов' : 'час'}`
	}

	if (remainingMinutes > 0) {
		result += `${result ? ' - ' : ''} ${remainingMinutes} ${remainingMinutes !== 1 ? 'минут' : 'минута'}`
	}

	if (remainingSeconds > 0) {
		result += `${result ? ' - ' : ''} ${remainingSeconds} ${remainingSeconds !== 1 ? 'секунд' : 'секунда'}`
	}

	return result.trim()
}
