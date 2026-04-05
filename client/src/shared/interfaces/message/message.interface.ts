import type {
	TypeMessage,
	TypeMessages,
	TypeNotificationMessage,
	TypeNotificationMessages,
} from '@/shared/types/message/message.type'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import type { Dispatch, SetStateAction } from 'react'
import type { IRoomId } from '../room/room.interface'

export interface IMessages {
	messages: TypeMessages
	setMessages: Dispatch<SetStateAction<TypeMessages>>
}

export interface IMessage extends TypeExistUser {
	message: TypeMessage
	setUnCheckedMessages: Dispatch<SetStateAction<number[]>>
}

export interface IMessageForm extends IRoomId{
	serviceId: number
	closeModal: () => void
}

export interface INotificationMessages {
	messages: TypeNotificationMessages
}

export interface INotificationMessage {
	message: TypeNotificationMessage
	isNotUser: boolean
}

export interface IGroupedNotificationMessages {
	[senderLogin: string]: TypeNotificationMessages
}

export interface IGroupedNotificationMessagesGroup {
	isNotUser: boolean
	messages: TypeNotificationMessages
	login: string
}
