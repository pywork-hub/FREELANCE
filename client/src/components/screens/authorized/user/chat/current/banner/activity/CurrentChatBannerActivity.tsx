'use client'

import type {
	IUserActivity,
	IUserId,
} from '@/shared/interfaces/user/user.interface'
import { useEffect, useState, type FC } from 'react'
import CurrentChatBannerActivityWrapper from './wrapper/CurrentChatBannerActivityWrapper'

const CurrentChatBannerActivity: FC<IUserId & IUserActivity> = ({
	userId,
	activity,
}) => {
	const [isHydrated, setIsHydrated] = useState(false)

	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return isHydrated ? (
		<CurrentChatBannerActivityWrapper userId={userId} activity={activity} />
	) : null
}

export default CurrentChatBannerActivity
