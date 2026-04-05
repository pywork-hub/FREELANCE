import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { SITE_NAME } from '@/constants/seo.constants'
import type { FC } from 'react'
import styles from './About.module.scss'
import AboutContent from './content/AboutContent'

const About: FC = () => {
	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						О {SITE_NAME}
					</Heading>
					<AboutContent />
				</div>
			</Container>
		</Section>
	)
}

export default About
