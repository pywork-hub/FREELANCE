import type { ICard } from '@/shared/interfaces/card/card.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Card.module.scss'

const Card: FC<ICard & IClassName> = ({ label, value, icon, className }) => {
	return (
		<div className={cn(styles.card, className && className)}>
			<p className={styles.label}>{label}</p>
			<div className={styles.bottom}>
				<span className={styles.value}>{value}</span>
				{icon}
			</div>
		</div>
	)
}

export default Card
