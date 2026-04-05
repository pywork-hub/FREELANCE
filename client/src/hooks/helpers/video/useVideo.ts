import { useEffect, useRef } from 'react'

export const useVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null)

	const startVideo = () => {
		const video = videoRef.current
		if (video) {
			video.volume = 0
			video.play()
		}
	}

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		video.addEventListener('ended', startVideo)

		return () => {
			video.removeEventListener('ended', startVideo)
		}
	}, [])

	return {
		videoRef,
		startVideo,
	}
}
