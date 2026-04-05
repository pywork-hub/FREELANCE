import StaticImage from '@/components/ui/common/image/StaticImage'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IStats } from '@/shared/interfaces/stats/stats.interface'
import { numberSpaceFormat } from '@/utils/formats/number/number-space-format.util'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Stats.module.scss'

const Stats: FC<{ stats: IStats } & IClassName> = ({ stats, className }) => {
	return (
		<ul className={styles.list}>
			{stats.items.map((item, index) => (
				<li className={cn(styles.item, className && className)} key={index}>
					<div className={styles.label}>
						{item.image ? (
							<StaticImage
								className={styles.image}
								src={item.image.src}
								width={item.image.width}
								height={item.image.height}
								alt={item.image.alt}
							/>
						) : (
							numberSpaceFormat(item.number)
						)}
					</div>
					<p className={styles.description}>{item.description}</p>
				</li>
			))}
		</ul>
	)
}

export default Stats
