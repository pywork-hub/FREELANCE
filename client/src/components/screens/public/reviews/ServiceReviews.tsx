import { Sort } from '@/__generated__/output'
import Review from '@/components/parts/review/Review'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { useReviews } from '@/hooks/public/reviews/useReviews'
import type {
	IPageSearchParam,
	IPageSlugExist,
} from '@/shared/interfaces/param/param.interface'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './ServiceReviews.module.scss'

const ServiceReviews: FC<IPageSearchParam & IPageSlugExist> = async ({
	searchParams,
	slug,
}) => {
	const { page, perPage } = {
		page: searchParams?.page ? String(searchParams.page) : '1',
		perPage: searchParams?.perPage ? String(searchParams.perPage) : '10',
	}
	const { reviews, count, error } = await useReviews(slug, {
		page,
		perPage,
		sort: Sort.Desc,
	})

	if (error) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Link href={PUBLIC_PAGES.SERVICE(slug)} className={styles.back}>
						<MoveLeft />
						Назад
					</Link>
					<Heading variant="h1" className={styles.heading}>
						Все отзывы ({count})
					</Heading>
					<ul className={styles.reviews}>
						{reviews.map((review) => (
							<Review
								className={styles.review}
								key={review.id}
								review={review}
							/>
						))}
					</ul>
					{count > +perPage && (
						<ServerPagination
							length={count}
							page={+page}
							perPage={+perPage}
							className={styles.pagination}
						/>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default ServiceReviews
