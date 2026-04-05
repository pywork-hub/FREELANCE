import {
	MessageStatus,
	useUserNotificationSubscription,
	type SessionUser,
} from '@/__generated__/output'
import { USER_PAGES } from '@/constants/url.constants'
import { useNotificationStore } from '@/store/notification/notification.store'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const useUserNotification = (user: SessionUser) => {
	const { addMessage, editMessage } = useNotificationStore()
	const pathname = usePathname()
	const { data } = useUserNotificationSubscription({
		variables: { userId: user.id },
	})

	useEffect(() => {
		if (data?.userNotification) {
			const message = data.userNotification
			const partnerLoginDecoded = decodeURIComponent(
				message.sender.profile.login
			)
			const pathnameDecoded = decodeURIComponent(pathname)
			if (pathnameDecoded.includes(USER_PAGES.CHAT(partnerLoginDecoded))) {
				return
			}

			if (message.status === MessageStatus.Posted) {
				addMessage(message, user.profile.login)
			} else {
				editMessage(
					message.id,
					message.status === MessageStatus.Edited
						? message.content
						: 'Сообщение удалено',
					message.status
				)
			}
		}
	}, [data?.userNotification])
}
