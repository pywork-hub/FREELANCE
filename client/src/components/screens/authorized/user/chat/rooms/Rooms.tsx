'use client'

import Room from '@/components/parts/room/Room'
import SearchField from '@/components/ui/common/form/search-field/SearchField'
import { useSearchRoom } from '@/hooks/user/room/useSearchRoom'
import type { IRooms } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Rooms.module.scss'

const Rooms: FC<IRooms & TypeExistUser> = ({ rooms, user, variant }) => {
	const { searchTerm, handleSearch, queriedRooms } = useSearchRoom(rooms)

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.currentRooms]: variant === 'current',
				[styles.allRooms]: variant === 'all',
			})}
		>
			<div className={styles.top}>
				<SearchField
					className={styles.search}
					searchTerm={searchTerm}
					handleSearch={handleSearch}
					placeholder="Search chat room"
				/>
			</div>
			<div className={styles.fill}>
				{queriedRooms.length !== 0 && (
					<ul className={styles.rooms}>
						{queriedRooms.map((room, index) => (
							<Room room={room} user={user} key={index} />
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Rooms
