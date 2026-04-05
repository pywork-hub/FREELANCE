import type { IGroupedNotificationMessages } from '@/shared/interfaces/message/message.interface'
import type { TypeNotificationMessages } from '@/shared/types/message/message.type'

export const groupNotificationMessages = (
	messages: TypeNotificationMessages
): IGroupedNotificationMessages => {
	const groupedMessages: IGroupedNotificationMessages = {}
	messages.forEach((message) => {
		const senderLogin = message.sender.profile.login
		if (!groupedMessages[senderLogin]) {
			groupedMessages[senderLogin] = []
		}
		groupedMessages[senderLogin].push(message)
	})
	return groupedMessages
}
