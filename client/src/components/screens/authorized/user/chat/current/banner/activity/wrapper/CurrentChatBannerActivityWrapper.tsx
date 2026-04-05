import { ActivityStatus } from '@/__generated__/output'
import { useRoomLastSeenTimer } from '@/hooks/helpers/room/useRoomLastSeenTimer'
import { useUsersActivities } from '@/hooks/user/activity/useUserActivity'
import type {
	IUserActivity,
	IUserId,
} from '@/shared/interfaces/user/user.interface'
import { lastSeenFormat } from '@/utils/formats/last-seen/last-seen-format.util'
import cn from 'clsx'
import { useState, type FC } from 'react'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerActivityWrapper: FC<IUserId & IUserActivity> = ({
	userId,
	activity,
}) => {
	const [subscribeActivity, setSubscribeActivity] = useState(activity)
	const [lastSeen, setLastSeen] = useState(() =>
		lastSeenFormat(activity.lastSeen)
	)
	useUsersActivities(userId, setSubscribeActivity)

	const isOnline = subscribeActivity.status === ActivityStatus.Online

	useRoomLastSeenTimer(isOnline, subscribeActivity.lastSeen, setLastSeen)

	return (
		<div className={styles.activity}>
			<p
				className={cn(styles.activityStatus, {
					[styles.online]: isOnline,
					[styles.offline]: !isOnline,
				})}
			>
				<span></span>
				{isOnline ? 'В сети' : 'Не в сети'}
			</p>
			{!isOnline && <p className={styles.lastSeen}>{lastSeen}</p>}
		</div>
	)
}

export default CurrentChatBannerActivityWrapper
