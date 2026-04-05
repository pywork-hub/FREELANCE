import cn from 'clsx'
import { Minus, Plus } from 'lucide-react'
import type { FC } from 'react'
import styles from './Quantity.module.scss'
import type { IQuantity } from './interface/quantity.interface'

const Quantity: FC<IQuantity> = ({ count, setCount, className }) => {
	return (
		<div className={cn(styles.quantity, className && className)}>
			<button
				className={styles.button}
				onClick={() => setCount(count !== 1 ? count - 1 : 1)}
			>
				<Minus />
			</button>
			<div className={styles.count}>{count}</div>
			<button className={styles.button} onClick={() => setCount(count + 1)}>
				<Plus />
			</button>
		</div>
	)
}

export default Quantity
