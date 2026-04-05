export const dateFormat = (createdAt: string) => {
	const date = new Date(createdAt)

	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const year = date.getFullYear().toString()

	return `${day}.${month}.${year}`
}
