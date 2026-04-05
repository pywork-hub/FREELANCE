import Service from '@/components/parts/service/Service'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { getUser } from '@/server/auth/get-server-session'
import type { ICurrentServiceSimilarServices } from '@/shared/interfaces/service/service.interface'
import type { FC } from 'react'
import styles from './SingleSimilar.module.scss'

const SingleSimilar: FC<ICurrentServiceSimilarServices> = async ({
	similarServices,
}) => {
	if (similarServices.length === 0) return null

	const user = await getUser()

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Похожие Услуги ({similarServices.length})
					</Heading>
					<ul className={styles.services}>
						{similarServices.map((service, index) => (
							<Service
								key={index}
								user={user}
								// @ts-ignore
								service={service}
								className={styles.service}
							/>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default SingleSimilar
