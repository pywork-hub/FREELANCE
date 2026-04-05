import { getUser } from '@/server/auth/get-server-session'
import type { ICurrentServiceData } from '@/shared/interfaces/service/service.interface'
import type { FC } from 'react'
import styles from './Single.module.scss'
import SingleAbout from './about/SingleAbout'
import SingleExamples from './examples/SingleExamples'
import SingleReviews from './reviews/SingleReviews'
import SingleSimilar from './similar/SingleSimilar'
import SingleVideo from './video/SingleVideo'

const Single: FC<ICurrentServiceData> = async ({
	reviewsCount,
	service,
	similarServices,
}) => {
	const user = await getUser()

	return (
		<div className={styles.service}>
			<SingleVideo service={service} />
			<SingleAbout service={service} />
			<SingleExamples service={service} />
			<SingleReviews
				reviews={service.reviews}
				count={reviewsCount}
				serviceId={service.id}
				serviceSlug={service.slug}
				user={user}
			/>
			<SingleSimilar similarServices={similarServices} />
		</div>
	)
}

export default Single
