import type { Block } from '@/__generated__/output'
import cn from 'clsx'
import type { FC } from 'react'
import Heading from '../heading/Heading'
import styles from './Block.module.scss'

const Block: FC<{ block: Block }> = ({ block: { heading, items } }) => {
	return (
		<div className={styles.wrapper}>
			<Heading variant="h1" className={styles.heading}>
				{heading}
			</Heading>
			<div className={styles.items}>
				{items.map(({ heading, content }, index) => (
					<div
						className={cn(
							styles.item,
							(index + 1) % 2 === 1 && index + 1 === items.length
								? styles.full
								: styles.half
						)}
						key={index}
					>
						<h2 className={styles.title}>{heading}</h2>
						<div
							className={styles.content}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Block
