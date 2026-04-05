import StaticImage from '@/components/ui/common/image/StaticImage'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IReview } from '@/shared/interfaces/review/review.interface'
import { dateFormat } from '@/utils/formats/date/date-format.util'
import cn from 'clsx'
import { Star } from 'lucide-react'
import type { FC } from 'react'
import styles from './Review.module.scss'

const Review: FC<IReview & IClassName> = ({ review, className }) => {
	return (
		<li className={cn(styles.review, className && className)}>
			<div className={styles.head}>
				<div className={styles.user}>
					<StaticImage
						src={review.user.profile.avatarPath}
						width={45}
						height={45}
						alt={review.user.profile.login}
					/>
					<div className={styles.info}>
						<h3 className={styles.login}>{review.user.profile.login}</h3>
						<span className={styles.created}>
							{dateFormat(review.createdAt)}
						</span>
					</div>
				</div>
				<ul className={styles.stars}>
					{Array.from({ length: 5 }, (_, index) => (
						<li
							key={index}
							className={cn(styles.star, {
								[styles.filled]: index + 1 <= review.rating,
							})}
						>
							<Star />
						</li>
					))}
				</ul>
			</div>
			<div
				className={styles.comment}
				dangerouslySetInnerHTML={{ __html: review.comment }}
			/>
		</li>
	)
}

export default Review
