import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import type { FC } from 'react'
import styles from './Faq.module.scss'
import FaqContent from './content/FaqContent'

const Faq: FC = () => {
	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Вопросы - Ответы
					</Heading>
					<FaqContent />
				</div>
			</Container>
		</Section>
	)
}

export default Faq
