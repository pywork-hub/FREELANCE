import type { NotificationMessagesQuery } from '@/__generated__/output'
import type { TypeCurrentRoom, TypeRooms } from '../room/room.type'

export type TypeMessages = TypeCurrentRoom['messages']
export type TypeMessage = TypeMessages[0]

export type TypeGroupedMessages = { date: string; messages: TypeMessages }[]

export type TypeLastMessage = TypeRooms[0]['lastMessage']

export type TypeNotificationMessages =
	NotificationMessagesQuery['notificationMessages']

export type TypeNotificationMessage = TypeNotificationMessages[0]
