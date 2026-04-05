export const orderCreatedFormat = (createdAt: string) => {
	const createdDate = new Date(createdAt)
	const month = (createdDate.getMonth() + 1).toString().padStart(2, '0')
	const day = createdDate.getDate().toString().padStart(2, '0')
	const year = createdDate.getFullYear()

	const formattedCreatedDate = `${day}.${month}.${year}`

	const formattedCreatedTime = createdDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	})

	return {
		formattedCreatedDate,
		formattedCreatedTime,
	}
}
