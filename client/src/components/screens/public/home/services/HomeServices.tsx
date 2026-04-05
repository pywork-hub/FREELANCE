import { Sort, Visibility } from '@/__generated__/output'
import Service from '@/components/parts/service/Service'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { useServices } from '@/hooks/public/services/useServices'
import { getUser } from '@/server/auth/get-server-session'
import type { FC } from 'react'
import styles from './HomeServices.module.scss'

const HomeServices: FC = async () => {
	const user = await getUser()
	const { services, error } = await useServices({
		page: '1',
		perPage: '4',
		orderTimes: Sort.Desc,
		sort: Sort.Desc,
		visibility: Visibility.Visible,
	})

	if (services.length === 0 || error) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Популярные услуги
					</Heading>
					<ul className={styles.services}>
						{services.map((service, index) => (
							<Service
								className={styles.service}
								service={service}
								user={user}
								key={index}
							/>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default HomeServices
