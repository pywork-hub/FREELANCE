export const timeFormat = (createdAt: string) => {
	const date = new Date(createdAt)
	const hours = date.getHours()
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const ampm = hours >= 12 ? 'PM' : 'AM'
	const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
	return `${formattedHours}:${minutes} ${ampm}`
}
