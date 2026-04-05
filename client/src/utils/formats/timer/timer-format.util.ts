export const timerFormat = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60

	const minuteText = 'мин.'
	const secondText = 'сек.'

	if (minutes > 0) {
		if (remainingSeconds > 0) {
			return `${minutes} ${minuteText} ${remainingSeconds} ${secondText}`
		} else {
			return `${minutes} ${minuteText}`
		}
	} else {
		return `${remainingSeconds} ${secondText}`
	}
}
