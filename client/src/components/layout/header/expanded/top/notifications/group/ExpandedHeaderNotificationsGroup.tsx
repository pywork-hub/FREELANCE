import { useNotificationCheckedMessage } from '@/hooks/user/room/useNotificationCheckedMessage'
import type { IGroupedNotificationMessagesGroup } from '@/shared/interfaces/message/message.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import type { FC } from 'react'
import styles from '../ExpandedHeaderNotifications.module.scss'
import ExpandedHeaderNotificationItem from './item/ExpandedHeaderNotificationItem'

const ExpandedHeaderNotificationsGroup: FC<
	IGroupedNotificationMessagesGroup & TypeExistUser
> = ({ messages, login, user, isNotUser }) => {
	useNotificationCheckedMessage(messages[0].roomId, user.id)

	return (
		<div className={styles.group}>
			<h2 className={styles.heading}>В чате с - {login}</h2>
			{messages.length > 0 && (
				<ul className={styles.list}>
					{messages.map((message, index) => (
						<ExpandedHeaderNotificationItem
							key={index}
							message={message}
							isNotUser={isNotUser}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

export default ExpandedHeaderNotificationsGroup
