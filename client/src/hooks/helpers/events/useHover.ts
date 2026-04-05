import { useEffect, useRef, useState } from 'react'

export const useHover = (initialIsVisible: boolean, delay: number) => {
	const [isHovered, setIsHovered] = useState(initialIsVisible)
	const ref = useRef<any>(null)
	let timeoutId: NodeJS.Timeout

	const handleHover = (event: any) => {
		clearTimeout(timeoutId)

		if (ref.current && ref.current.contains(event.target)) {
			timeoutId = setTimeout(() => {
				setIsHovered(true)
			}, delay)
		} else {
			setIsHovered(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mouseover', handleHover, true)

		return () => {
			document.removeEventListener('mouseover', handleHover, true)
			clearTimeout(timeoutId)
		}
	}, [delay])

	return { ref, isHovered }
}
