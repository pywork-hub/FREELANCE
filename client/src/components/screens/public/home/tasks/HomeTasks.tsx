import Task from '@/components/parts/task/Task'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { SITE_NAME } from '@/constants/seo.constants'
import type { FC } from 'react'
import styles from './HomeTasks.module.scss'
import { HOME_TASKS_DATA } from './data/home-tasks.data'

const HomeTasks: FC = () => {
	return (
		<Section className={styles.section} id="how-to-buy">
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Как заказать услуги на {SITE_NAME}
					</Heading>
					<p className={styles.subHeading}>
						Отлично подходит для бизнеса и личного использования.
					</p>
					<div className={styles.tasks}>
						{HOME_TASKS_DATA.items.map((item, index) => (
							<Task className={styles.task} item={item} key={index} />
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default HomeTasks
