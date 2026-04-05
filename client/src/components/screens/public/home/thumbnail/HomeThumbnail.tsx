import FilledImage from '@/components/ui/common/image/FilledImage'
import Section from '@/components/ui/common/section/Section'
import { SITE_NAME } from '@/constants/seo.constants'
import type { FC } from 'react'
import styles from './HomeThumbnail.module.scss'

const HomeThumbnail: FC = () => {
	return (
		<Section className={styles.section}>
			<FilledImage
				src="/images/pages/home/thumbnail.webp"
				alt={`${SITE_NAME} thumbnail`}
			/>
		</Section>
	)
}

export default HomeThumbnail
