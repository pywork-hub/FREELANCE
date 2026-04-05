export const orderTermFormat = (createdAt: Date, term: number) => {
	const startTime = createdAt.getTime()
	const endTime = startTime + term * 1000
	const currentTime = new Date().getTime()
	let timeLeft = endTime - currentTime

	if (timeLeft < 0) {
		timeLeft = 0
	}

	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	)
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

	return {
		days,
		hours,
		minutes,
		seconds,
	}
}
