import { EnumStorage } from '@/constants/storage.constants'
import type { INotificationStore } from '@/shared/interfaces/store/store.interface'
import type {
	TypeNotificationMessage,
	TypeNotificationMessages,
} from '@/shared/types/message/message.type'
import { groupNotificationMessages } from '@/utils/helpers/message/group-notification-messages.util'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useNotificationStore = create<INotificationStore>()(
	persist<INotificationStore>(
		(set, get) => {
			return {
				notifications: {},
				isQueried: false,
				isHydrated: false,
				setIsHydrated: (state) => {
					set({ isHydrated: state })
				},
				setInitialState: (messages: TypeNotificationMessages) => {
					const groupedMessages = groupNotificationMessages(messages)
					set({ notifications: groupedMessages, isQueried: true })
				},
				editMessage(id: number, content: string, status) {
					const { notifications } = get()

					const updatedNotifications = Object.fromEntries(
						Object.entries(notifications).map(([login, messages]) => [
							login,
							messages.map((message) =>
								message.id === id ? { ...message, content, status } : message
							),
						])
					)

					set({ notifications: updatedNotifications })

					const notificationSound = new Audio(
						'/audio/notification/notification.mp3'
					)
					notificationSound.play()
				},
				addMessage: (
					message: TypeNotificationMessage,
					currentLogin: string
				) => {
					const { notifications } = get()

					const senderLogin = message.sender.profile.login
					const groupLogin =
						currentLogin === senderLogin
							? message.room.users.find(
									(user) => user.profile.login !== currentLogin
							  )?.profile.login || senderLogin
							: senderLogin

					const newMessage = {
						id: message.id,
						content: message.content,
						sender: {
							profile: {
								login: message.sender.profile.login,
								avatarPath: message.sender.profile.avatarPath,
							},
						},
						room: message.room,
						type: message.type,
						orderId: message.orderId,
						roomId: message.roomId,
						status: message.status,
						createdAt: message.createdAt,
					}

					const existingGroup = notifications[groupLogin] || []

					const updatedNotifications = {
						...notifications,
						[groupLogin]: [newMessage, ...existingGroup],
					}
					set({ notifications: updatedNotifications })

					const notificationSound = new Audio(
						'/audio/notification/notification.mp3'
					)
					notificationSound.play()
				},
				checkMessages: (messagesIds: number[]) => {
					const { notifications } = get()
					const newGroupedMessages = { ...notifications }

					for (const [login, messages] of Object.entries(newGroupedMessages)) {
						const remainingMessages = messages.filter(
							(message) => !messagesIds.includes(message.id)
						)

						if (remainingMessages.length > 0) {
							newGroupedMessages[login] = remainingMessages
						} else {
							delete newGroupedMessages[login]
						}
					}

					set({ notifications: newGroupedMessages })
				},
				checkMessageWithQuery: (checkedMessagesIds: number[]) => {
					const { notifications } = get()
					const newGroupedMessages = { ...notifications }
					for (const [login, messages] of Object.entries(notifications)) {
						const remainingMessages = messages.filter(
							(message) => !checkedMessagesIds.includes(message.id)
						)

						if (remainingMessages.length > 0) {
							newGroupedMessages[login] = remainingMessages
						} else {
							delete newGroupedMessages[login]
						}
					}
					set({ notifications: newGroupedMessages })
				},
				length: () => {
					const { notifications } = get()
					return Object.values(notifications).flat().length
				},
			}
		},
		{
			name: EnumStorage.NOTIFICATION,
			storage: createJSONStorage(() => sessionStorage),
			onRehydrateStorage: () => (state) => {
				state?.setIsHydrated(true)
			},
		}
	)
)
