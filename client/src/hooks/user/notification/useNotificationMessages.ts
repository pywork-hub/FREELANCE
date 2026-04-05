import { useNotificationMessagesQuery } from '@/__generated__/output'
import { useNotificationStore } from '@/store/notification/notification.store'

export const useNotificationMessages = () => {
	const { setInitialState, isQueried } = useNotificationStore()

	useNotificationMessagesQuery({
		skip: isQueried,
		onCompleted: (data) => {
			setInitialState(data?.notificationMessages || [])
		},
	})
}
