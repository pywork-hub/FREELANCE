import type { IAccordionItem } from '@/shared/interfaces/accordion/accordion.interface'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from '../Accordion.module.scss'

const AccordionItem: FC<{ item: IAccordionItem }> = ({
	item: { heading, content },
}) => {
	const [isShow, setIsShow] = useState(true)

	return (
		<li className={styles.accordion}>
			<button onClick={() => setIsShow(!isShow)} className={styles.toggle}>
				<span>{heading}</span>
				{isShow ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isShow && <div className={styles.content}>{content}</div>}
		</li>
	)
}

export default AccordionItem
