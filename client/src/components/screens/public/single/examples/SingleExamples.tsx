'use client'

import Example from '@/components/parts/example/Example'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import Gallery from '@/components/ui/templates/gallery/Gallery'
import { useToggleBodyOverflow } from '@/hooks/helpers/body/useToggleBodyOverflow'
import type { ICurrentService } from '@/shared/interfaces/service/service.interface'
import { useEffect, useState, type FC } from 'react'
import styles from './SingleExamples.module.scss'

const SingleExamples: FC<ICurrentService> = ({ service }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	const [{ isShow, index }, setGalleryState] = useState({
		isShow: false,
		index: 0,
	})

	useEffect(() => {
		setIsHydrated(true)
	}, [])
	useToggleBodyOverflow(isShow)

	if (service.examples.length === 0) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Примеры ({service.examples.length})
					</Heading>
					<ul className={styles.examples}>
						{service.examples.map((example, index) => (
							<Example
								key={index}
								// @ts-ignore
								example={example}
								openGallery={() =>
									setGalleryState({
										isShow: true,
										index,
									})
								}
								className={styles.example}
							/>
						))}
					</ul>
					{isHydrated && (
						<Gallery
							isShow={isShow}
							closeModal={() =>
								setGalleryState((prev) => ({
									...prev,
									isShow: false,
								}))
							}
							activeSlider={index}
							images={service.examples.map((example) => example.imagePath)}
						/>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default SingleExamples
