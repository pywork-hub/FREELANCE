import { useContactStore } from '@/store/timer/timer.store'
import { useEffect } from 'react'

export default function ContactProvider() {
	const { remainingTime, setTimer } = useContactStore()

	useEffect(() => {
		if (remainingTime > 0) {
			setTimer(remainingTime)
		}
	}, [remainingTime, setTimer])

	return <></>
}
