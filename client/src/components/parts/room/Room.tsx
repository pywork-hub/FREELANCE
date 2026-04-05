'use client'

import {
	ActivityStatus,
	MessageStatus,
	MessageType,
} from '@/__generated__/output'
import StaticImage from '@/components/ui/common/image/StaticImage'
import { USER_PAGES } from '@/constants/url.constants'
import { useUsersActivities } from '@/hooks/user/activity/useUserActivity'
import { useLastCheckedMessage } from '@/hooks/user/room/useLastCheckedMessage'
import { useLastMessage } from '@/hooks/user/room/useLastMessage'
import type { IRoom } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { MESSAGE_TYPE_TRANSLATE } from '@/translates/message/message-type.translate'
import { dateFormat } from '@/utils/formats/date/date-format.util'
import { textFormat } from '@/utils/formats/text/text-format.util'
import cn from 'clsx'
import { CheckCheck } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type FC } from 'react'
import styles from './Room.module.scss'

const Room: FC<IRoom & TypeExistUser> = ({ room, user }) => {
	const { push, refresh } = useRouter()
	const pathname = usePathname()
	const [lastMessage, setLastMessage] = useState(room.lastMessage)
	const [subscribeActivity, setSubscribeActivity] = useState(
		room.partner.activity
	)

	useLastMessage(setLastMessage, room.id, lastMessage?.id)
	useLastCheckedMessage(setLastMessage, room.id, room.partner.id)
	useUsersActivities(room.partner.id, setSubscribeActivity)

	const isPicked = decodeURIComponent(pathname).includes(
		decodeURIComponent(room.partner.profile.login)
	)

	const isOnline = subscribeActivity.status === ActivityStatus.Online
	const isSenderCurrentUser = lastMessage?.senderId === user.id
	const isDeleted = lastMessage?.status === MessageStatus.Deleted
	const isEdited = lastMessage?.status === MessageStatus.Edited

	return (
		<li className={styles.room}>
			<button
				className={cn(styles.link, {
					[styles.picked]: isPicked,
				})}
				onClick={() => {
					push(USER_PAGES.CHAT(room.partner.profile.login))
					refresh()
				}}
				disabled={isPicked}
			>
				<div className={styles.avatar}>
					<StaticImage
						src={room.partner.profile.avatarPath}
						width={40}
						height={40}
						alt={room.partner.profile.login}
					/>
					<span
						className={cn(styles.status, {
							[styles.online]: isOnline,
							[styles.offline]: !isOnline,
						})}
					></span>
				</div>
				<div className={styles.info}>
					<div className={styles.head}>
						<h3 className={styles.login}>{room.partner.profile.login}</h3>
						<span className={styles.date}>
							{lastMessage && dateFormat(lastMessage.createdAt)}
						</span>
					</div>
					{lastMessage && (
						<div className={styles.bottom}>
							<div
								className={cn(styles.message, {
									[styles.green]:
										lastMessage.type === MessageType.Offer ||
										lastMessage.type === MessageType.OrderInProcess ||
										lastMessage.type === MessageType.OrderCompleted ||
										lastMessage.type === MessageType.ReviewOffered ||
										lastMessage.type === MessageType.ReviewLeft,
									[styles.red]: lastMessage.type === MessageType.OrderCanceled,
									[styles.orange]:
										lastMessage.type === MessageType.OrderExpired,
									[styles.pink]: lastMessage.type === MessageType.OrderRefunded,
									[styles.blue]: isDeleted || isEdited,
								})}
								dangerouslySetInnerHTML={{
									__html: `${isSenderCurrentUser ? 'Вы: ' : ''}${
										isDeleted
											? 'Сообщение удалено'
											: lastMessage.type === MessageType.Message ||
											  lastMessage.type === MessageType.Service
											? textFormat(lastMessage.content)
											: MESSAGE_TYPE_TRANSLATE[lastMessage.type]
									}`,
								}}
							/>
							{isSenderCurrentUser && !isDeleted && (
								<CheckCheck
									className={cn(styles.check, {
										[styles.checked]: lastMessage.isChecked,
									})}
								/>
							)}
						</div>
					)}
				</div>
			</button>
		</li>
	)
}

export default Room
