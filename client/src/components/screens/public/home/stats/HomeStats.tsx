import Stats from '@/components/parts/stats/Stats'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import type { FC } from 'react'
import styles from './HomeStats.module.scss'
import { HOME_STATS_DATA } from './data/home-stats.data'

const HomeStats: FC = () => {
	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Stats stats={HOME_STATS_DATA} className={styles.stat} />
				</div>
			</Container>
		</Section>
	)
}

export default HomeStats
