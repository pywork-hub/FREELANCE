import { useState } from 'react'

export const useSlider = (slides: string[], activeIndex: number) => {
	const [currentIndex, setCurrentIndex] = useState(activeIndex)

	const isFirstSlide = currentIndex === 0
	const isLastSlide = currentIndex === slides.length - 1

	const goToPrevious = () => {
		setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1)
	}

	const goToNext = () => {
		setCurrentIndex(isLastSlide ? 0 : currentIndex + 1)
	}

	return { goToPrevious, goToNext, currentIndex }
}
