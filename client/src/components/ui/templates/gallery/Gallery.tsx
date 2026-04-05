import { SITE_NAME } from '@/constants/seo.constants'
import { useSlider } from '@/hooks/helpers/slider/useSlider'
import cn from 'clsx'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { FC } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import StaticImage from '../../common/image/StaticImage'
import styles from './Gallery.module.scss'
import type { IGallery } from './interface/gallery.interface'

const Gallery: FC<IGallery> = ({
	className,
	isShow,
	closeModal,
	images,
	activeSlider,
}) => {
	const { currentIndex, goToPrevious, goToNext } = useSlider(
		images,
		activeSlider
	)
	const galleryRef = useRef<HTMLElement | null>(
		document.getElementById('gallery')
	)

	if (!galleryRef.current) return null

	return ReactDOM.createPortal(
		<div
			className={cn(
				styles.window,
				{
					[styles.active]: isShow,
				},
				className && className
			)}
		>
			<button className={styles.close} onClick={closeModal}>
				<X />
			</button>
			<div className={styles.fill}>
				<button
					className={cn(styles.arrow, styles.prev)}
					onClick={goToPrevious}
				>
					<ChevronLeft />
				</button>
				<div className={styles.slide}>
					{images.map((image, index) => (
						<StaticImage
							className={cn(styles.image, {
								[styles.active]: currentIndex === index,
							})}
							src={image}
							width={1400}
							height={0}
							alt={SITE_NAME}
						/>
					))}
				</div>
				<button className={cn(styles.arrow, styles.next)} onClick={goToNext}>
					<ChevronRight />
				</button>
			</div>
		</div>,
		galleryRef.current
	)
}

export default Gallery
