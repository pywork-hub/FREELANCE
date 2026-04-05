'use client'

import type { TypeExistUser } from '@/shared/types/user/user.type'
import { useNotificationStore } from '@/store/notification/notification.store'
import type { FC } from 'react'
import ExpandedHeaderNotificationsWrapper from './wrapper/ExpandedHeaderNotificationsWrapper'

const ExpandedHeaderNotifications: FC<TypeExistUser> = ({ user }) => {
	const { isHydrated } = useNotificationStore()

	return isHydrated ? <ExpandedHeaderNotificationsWrapper user={user} /> : null
}

export default ExpandedHeaderNotifications
