import type {
	TypeGroupedMessages,
	TypeMessages,
} from '@/shared/types/message/message.type'
import type { TypeCurrentRoom } from '@/shared/types/room/room.type'
import { dateFormat } from '@/utils/formats/date/date-format.util'

export const groupMessages = (messages: TypeMessages): TypeGroupedMessages => {
	const groups: Record<string, TypeCurrentRoom['messages']> = {}
	messages.forEach((message) => {
		const date = dateFormat(message.createdAt)
		if (!groups[date]) {
			groups[date] = []
		}
		groups[date].push(message)
	})

	return Object.entries(groups).map(([date, messages]) => ({
		date,
		messages,
	}))
}
