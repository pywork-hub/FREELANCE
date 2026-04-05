import Accordion from '@/components/ui/elements/accordion/Accordion'
import type { FC } from 'react'
import styles from '../Faq.module.scss'
import { FAQ_CONTENT } from './data/faq-content.data'

const FaqContent: FC = () => {
	return (
		<div className={styles.content}>
			<Accordion items={FAQ_CONTENT.items} />
		</div>
	)
}

export default FaqContent
