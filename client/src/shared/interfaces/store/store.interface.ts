import type { MessageStatus } from '@/__generated__/output'
import type {
	TypeNotificationMessage,
	TypeNotificationMessages,
} from '@/shared/types/message/message.type'
import type { IGroupedNotificationMessages } from '../message/message.interface'

export interface INotificationStore {
	notifications: IGroupedNotificationMessages
	isQueried: boolean
	isHydrated: boolean
	setIsHydrated: (state: boolean) => void
	setInitialState: (messages: TypeNotificationMessages) => void
	addMessage: (message: TypeNotificationMessage, currentLogin: string) => void
	editMessage: (
		id: number,
		content: string,
		status: MessageStatus
	) => void
	checkMessages: (messagesIds: number[]) => void
	checkMessageWithQuery: (checkedMessagesIds: number[]) => void
	length: () => number
}

export interface IAuthStore {
	remainingTime: number
	setTimer: (remainingTime: number) => void
	clearTimer: () => void
}
