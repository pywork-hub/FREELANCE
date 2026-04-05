'use client'

import StaticImage from '@/components/ui/common/image/StaticImage'
import Modal from '@/components/ui/templates/modal/Modal'
import type { IExampleReview } from '@/shared/interfaces/example/example.interface'
import { dateFormat } from '@/utils/formats/date/date-format.util'
import { HelpCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, type FC } from 'react'
import styles from '../Example.module.scss'

const ExampleReview: FC<IExampleReview> = ({ review, url }) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<>
			<button className={styles.question} onClick={() => setIsShow(true)}>
				<HelpCircle />
			</button>
			{isShow && (
				<Modal
					heading="Информация"
					closeModal={() => setIsShow(false)}
					size="lg"
				>
					<div className={styles.review}>
						<p className={styles.label}>Заказал</p>
						<div className={styles.head}>
							<div className={styles.customer}>
								<StaticImage
									src={review.user.profile.avatarPath}
									width={37}
									height={37}
									alt={review.user.profile.login}
								/>
								<span className={styles.login}>
									{review.user.profile.login}
								</span>
							</div>
							<span className={styles.created}>
								{dateFormat(review.createdAt)}
							</span>
						</div>
						<div className={styles.content}>
							<div className={styles.info}>
								<p className={styles.label}>Отзыв</p>
								<div className={styles.rating}>
									<Star />
									<span>{review.rating}.0</span>
								</div>
							</div>
							<div
								className={styles.comment}
								dangerouslySetInnerHTML={{ __html: review.comment }}
							/>
						</div>
						{url && (
							<Link className={styles.project} href={url} target="_blank">
								Ссылка на проект
							</Link>
						)}
					</div>
				</Modal>
			)}
		</>
	)
}

export default ExampleReview
