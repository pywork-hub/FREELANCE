import cn from 'clsx'
import { Star } from 'lucide-react'
import { useState, type FC } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './StarRating.module.scss'
import type { TypeStarRating } from './interface/star-rating.interface'

const StarRating: FC<TypeStarRating> = ({
	className,
	label,
	error,
	value,
	onChange,
	...rest
}) => {
	const [hover, setHover] = useState(value)

	return (
		<div className={cn(globalStyles.field, className && className)}>
			{label && <label className={globalStyles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error.message}</span>}
			<ul className={styles.stars}>
				{[1, 2, 3, 4, 5].map((rate) => (
					<li className={styles.star} key={rate}>
						<button
							type="button"
							className={cn(styles.btn, {
								[styles.filled]: rate <= value || rate <= hover,
							})}
							onMouseEnter={() => setHover(rate)}
							onMouseLeave={() => setHover(0)}
							onClick={() => {
								onChange(rate)
							}}
							{...rest}
						>
							<Star />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default StarRating
