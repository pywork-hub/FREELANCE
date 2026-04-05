import { UserRole } from '@/__generated__/output'
import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import { useNotificationMessages } from '@/hooks/user/notification/useNotificationMessages'
import { useUserNotification } from '@/hooks/user/notification/useUserNotification'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { useNotificationStore } from '@/store/notification/notification.store'
import { Bell, BellRing } from 'lucide-react'
import type { FC } from 'react'
import styles from '../ExpandedHeaderNotifications.module.scss'
import ExpandedHeaderNotificationsGroup from '../group/ExpandedHeaderNotificationsGroup'

const ExpandedHeaderNotificationsWrapper: FC<TypeExistUser> = ({ user }) => {
	const { notifications, length } = useNotificationStore()

	useNotificationMessages()
	useUserNotification(user)

	const notificationsLength = length()
	const isNotUser =
		user.roles.includes(UserRole.Manager) || user.roles.includes(UserRole.Admin)

	return (
		<div className={styles.notifications}>
			<div className={styles.toggle}>
				{notificationsLength ? (
					<>
						<span className={styles.circle}>{notificationsLength}</span>
						<BellRing />
						<Dropdown className={styles.dropdown}>
							<div className={styles.groups}>
								{Object.keys(notifications).map((login, index) => (
									<ExpandedHeaderNotificationsGroup
										key={index}
										messages={notifications[login]}
										login={login}
										user={user}
										isNotUser={isNotUser}
									/>
								))}
							</div>
						</Dropdown>
					</>
				) : (
					<Bell />
				)}
			</div>
		</div>
	)
}

export default ExpandedHeaderNotificationsWrapper
