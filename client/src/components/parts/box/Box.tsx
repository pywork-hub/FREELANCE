import type { IBox } from '@/shared/interfaces/box/box.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Box.module.scss'

const Box: FC<{ item: IBox } & IClassName> = ({ item, className }) => {
	return (
		<li className={cn(styles.box, className && className)}>
			<item.icon />
			<div className={styles.info}>
				<h3 className={styles.name}>{item.name}</h3>
				<p
					className={styles.description}
					dangerouslySetInnerHTML={{ __html: item.description }}
				/>
			</div>
		</li>
	)
}

export default Box
