import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import type { ICurrentService } from '@/shared/interfaces/service/service.interface'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './SingleAbout.module.scss'
import SingleAboutDetails from './details/SingleAboutDetails'
import SingleAboutActions from './actions/SingleAboutActions'

const SingleAbout: FC<ICurrentService> = ({ service }) => {
	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.top}>
						<Heading variant="h1" className={styles.heading}>
							{service.name}
						</Heading>
						{service.categories.length > 0 && (
							<ul className={styles.categories}>
								{service.categories.map((category, index) => (
									<li className={styles.category} key={index}>
										<Link
											className={styles.categoryLink}
											href={PUBLIC_PAGES.CATEGORY(category.slug)}
										>
											{category.name}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className={styles.details}>
						<SingleAboutDetails service={service} />
						<SingleAboutActions service={service} />
					</div>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: service.description }}
					/>
				</div>
			</Container>
		</Section>
	)
}

export default SingleAbout
