import {
	useUserActivitySubscription,
	type Activity,
} from '@/__generated__/output'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useUsersActivities = (
	userId: number,
	setSubscribeActivity: Dispatch<SetStateAction<Activity>>
) => {
	const { data } = useUserActivitySubscription({
		variables: {
			userId,
		},
	})

	useEffect(() => {
		if (data?.userActivity) {
			setSubscribeActivity(data.userActivity)
		}
	}, [data?.userActivity])

	return { data }
}
