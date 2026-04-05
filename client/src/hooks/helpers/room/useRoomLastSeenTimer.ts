import { lastSeenFormat } from '@/utils/formats/last-seen/last-seen-format.util'
import { lastSeenInterval } from '@/utils/formats/last-seen/last-seen-interval.util'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

export const useRoomLastSeenTimer = (
	isOnline: boolean,
	subscribeLastSeen: string,
	setLastSeen: Dispatch<SetStateAction<string>>
) => {
	useEffect(() => {
		let intervalId: NodeJS.Timeout

		if (!isOnline) {
			const updateLastSeen = () => {
				setLastSeen(lastSeenFormat(new Date(subscribeLastSeen)))
			}

			updateLastSeen()

			const interval = lastSeenInterval(new Date(subscribeLastSeen))

			intervalId = setInterval(updateLastSeen, interval)
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId)
			}
		}
	}, [isOnline, subscribeLastSeen])
}
