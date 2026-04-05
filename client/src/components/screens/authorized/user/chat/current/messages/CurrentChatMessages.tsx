'use client'

import '@/assets/styles/chat.scss'
import Message from '@/components/parts/message/Message'
import { useRoomScroll } from '@/hooks/helpers/room/useRoomScrolledToTop'
import { useCheckMessages } from '@/hooks/user/room/useCheckMessages'
import { useCheckedMessage } from '@/hooks/user/room/useCheckedMessage'
import { useNewMessage } from '@/hooks/user/room/useNewMessage'
import type { IMessages } from '@/shared/interfaces/message/message.interface'
import type { IRoom } from '@/shared/interfaces/room/room.interface'
import type { TypeGroupedMessages } from '@/shared/types/message/message.type'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { groupMessages } from '@/utils/helpers/message/group-messages.util'
import { Fragment, useEffect, useRef, useState, type FC } from 'react'
import styles from './CurrentChatMessages.module.scss'

const CurrentChatMessages: FC<IMessages & TypeExistUser & IRoom> = ({
	messages,
	setMessages,
	room,
	user,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	const [unCheckedMessages, setUnCheckedMessages] = useState<number[]>([])
	const [groupedMessages, setGroupedMessages] = useState<TypeGroupedMessages>(
		groupMessages(messages)
	)

	const { checkMessages } = useCheckMessages()

	useRoomScroll(room.id, messages.length, scrollRef, setMessages)
	useNewMessage(setMessages, room.id)
	useCheckedMessage(setMessages, room.id, room.partner.id)

	useEffect(() => {
		if (messages.length > 0) {
			setGroupedMessages(groupMessages(messages))
		}
	}, [messages])

	useEffect(() => {
		if (unCheckedMessages.length > 0) {
			checkMessages(room.id, unCheckedMessages)
		}
	}, [unCheckedMessages])

	return (
		<div className={styles.wrapper}>
			<div className={styles.messages} ref={scrollRef}>
				{groupedMessages.map(({ date, messages }, index) => (
					<Fragment key={index}>
						{messages.map((message, index) => (
							<Message
								key={index}
								roomId={room.id}
								message={message}
								user={user}
								setUnCheckedMessages={setUnCheckedMessages}
							/>
						))}
						<div className={styles.date}>
							<span>{date}</span>
						</div>
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default CurrentChatMessages
