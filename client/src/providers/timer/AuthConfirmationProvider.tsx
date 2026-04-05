'use client'

import { useAuthConfirmationStore } from '@/store/timer/timer.store'
import { useEffect } from 'react'

export default function AuthConfirmationProvider() {
	const { remainingTime, setTimer } = useAuthConfirmationStore()

	useEffect(() => {
		if (remainingTime > 0) {
			setTimer(remainingTime)
		}
	}, [remainingTime, setTimer])

	return <></>
}
