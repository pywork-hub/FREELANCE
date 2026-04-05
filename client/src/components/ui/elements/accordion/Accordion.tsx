'use client'

import type { IAccordion } from '@/shared/interfaces/accordion/accordion.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Accordion.module.scss'
import AccordionItem from './item/AccordionItem'

const Accordion: FC<IAccordion & IClassName> = ({ items, className }) => {
	if (items.length === 0) return null

	return (
		<ul className={cn(styles.accordions, className && className)}>
			{items.map((item, index) => (
				<AccordionItem key={index} item={item} />
			))}
		</ul>
	)
}

export default Accordion
