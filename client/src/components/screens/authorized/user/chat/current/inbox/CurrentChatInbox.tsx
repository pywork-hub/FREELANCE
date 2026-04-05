'use client'

import type { ICurrentRoom } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { useEffect, useState, type FC } from 'react'
import CurrentChatBanner from '../banner/CurrentChatBanner'
import CurrentChatForm from '../form/CurrentChatForm'
import CurrentChatMessages from '../messages/CurrentChatMessages'
import styles from './CurrentChatInbox.module.scss'

const CurrentChatInbox: FC<ICurrentRoom & TypeExistUser> = ({ room, user }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	const [subMessages, setSubMessages] = useState(room.messages)

	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		isHydrated && (
			<div className={styles.inbox}>
				<CurrentChatBanner room={room} user={user} />
				<div className={styles.inner}>
					<CurrentChatMessages
						messages={subMessages}
						setMessages={setSubMessages}
						room={room}
						user={user}
					/>
					<CurrentChatForm room={room} />
				</div>
			</div>
		)
	)
}

export default CurrentChatInbox
