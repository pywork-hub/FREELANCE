import Container from '@/components/ui/common/container/Container'
import FilledImage from '@/components/ui/common/image/FilledImage'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { SITE_NAME } from '@/constants/seo.constants'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './HomeBanner.module.scss'

const HomeBanner: FC = () => {
	return (
		<Section className={styles.section}>
			<FilledImage
				src="/images/pages/home/banner.webp"
				alt={`${SITE_NAME} banner`}
			/>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Закажите услуги на {SITE_NAME} прямо сейчас
					</Heading>
					<p className={styles.text}>Быстро, просто и безопасно!</p>
					<Link href={PUBLIC_PAGES.MARKET} className={styles.link}>
						Начать
					</Link>
				</div>
			</Container>
		</Section>
	)
}

export default HomeBanner
