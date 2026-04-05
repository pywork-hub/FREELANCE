'use client'

import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import { useVideo } from '@/hooks/helpers/video/useVideo'
import type { ICurrentService } from '@/shared/interfaces/service/service.interface'
import type { FC } from 'react'
import styles from './SingleVideo.module.scss'

const SingleVideo: FC<ICurrentService> = ({ service }) => {
	const { videoRef } = useVideo()

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<video ref={videoRef} autoPlay muted>
						<source src={service.videoPath} />
					</video>
				</div>
			</Container>
		</Section>
	)
}

export default SingleVideo
