'use client'

import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { useDeleteRoom } from '@/hooks/user/room/useDeleteRoom'
import type { IRoomId } from '@/shared/interfaces/room/room.interface'
import type { FC } from 'react'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerDelete: FC<IRoomId> = ({ roomId }) => {
	const { deleteRoom, loading } = useDeleteRoom()

	return (
		<>
			{loading ? (
				<MiniLoader className={styles.deleteLoader} />
			) : (
				<button
					className={styles.deleteBtn}
					onClick={() => deleteRoom(roomId)}
					disabled={loading}
				>
					Удалить чат
				</button>
			)}
		</>
	)
}

export default CurrentChatBannerDelete
