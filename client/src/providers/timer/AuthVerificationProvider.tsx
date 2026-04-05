'use client'

import { useAuthVerificationStore } from '@/store/timer/timer.store'
import { useEffect } from 'react'

export default function AuthVerificationProvider() {
	const { remainingTime, setTimer } = useAuthVerificationStore()

	useEffect(() => {
		if (remainingTime > 0) {
			setTimer(remainingTime)
		}
	}, [remainingTime, setTimer])

	return <></>
}
