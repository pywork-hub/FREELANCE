'use client'

import Review from '@/components/parts/review/Review'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import Modal from '@/components/ui/templates/modal/Modal'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import type { ICurrentServiceReviews } from '@/shared/interfaces/service/service.interface'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import Link from 'next/link'
import { useState, type FC } from 'react'
import styles from './SingleReviews.module.scss'

const SingleReviews: FC<ICurrentServiceReviews & TypeIronUser> = ({
	reviews: allReviews,
	count,
	user,
	serviceId,
	serviceSlug,
}) => {
	const [isShow, setIsShow] = useState(false)
	const [reviews, setReviews] = useState(allReviews)
	const [reviewsCount, setReviewsCount] = useState(count)

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.top}>
						<Heading variant="h2" className={styles.heading}>
							Отзывы ({reviewsCount})
						</Heading>
						{user && (
							<button className={styles.add} onClick={() => setIsShow(true)}>
								Как оставить отзыв?
							</button>
						)}
						{isShow && (
							<Modal
								closeModal={() => setIsShow(false)}
								heading="Как оставить отзыв?"
								size="lg"
							>
								<p className={styles.how}>
									Для того чтобы оставить отзыв, вы должны{' '}
									<span>заказать услугу.</span>
								</p>
							</Modal>
						)}
					</div>
					{count > 0 && (
						<ul className={styles.reviews}>
							{reviews.map((review) => (
								<Review
									key={review.id}
									review={review}
									className={styles.review}
								/>
							))}
						</ul>
					)}
					{count > 3 && (
						<Link
							target="_blank"
							href={PUBLIC_PAGES.REVIEWS(serviceSlug)}
							className={styles.more}
						>
							Все отзывы
						</Link>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default SingleReviews
