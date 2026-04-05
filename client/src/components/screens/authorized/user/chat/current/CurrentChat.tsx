import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import { useUserRooms } from '@/hooks/user/room/useUserRooms'
import { getExistUser } from '@/server/auth/get-server-session'
import type { ICurrentRoom } from '@/shared/interfaces/room/room.interface'
import type { FC } from 'react'
import styles from '../Chat.module.scss'
import Rooms from '../rooms/Rooms'
import CurrentChatInbox from './inbox/CurrentChatInbox'

const CurrentChat: FC<ICurrentRoom> = async ({ room }) => {
	const { rooms, error } = await useUserRooms()
	const user = await getExistUser()

	if (error) return null

	return (
		<Section className={styles.chat}>
			<Container>
				<div className={styles.wrapper}>
					<Rooms rooms={rooms} user={user} variant="current" />
					<CurrentChatInbox room={room} user={user} />
				</div>
			</Container>
		</Section>
	)
}

export default CurrentChat
