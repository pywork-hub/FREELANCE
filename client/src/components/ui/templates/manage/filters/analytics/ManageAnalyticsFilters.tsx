import DurationFilter from '@/components/ui/elements/filters/duration/DurationFilter'
import type { IManageAnalyticsFilters } from '@/shared/interfaces/filter/filter.interface'
import type { FC } from 'react'
import styles from './ManageAnalyticsFilters.module.scss'

const ManageAnalyticsFilters: FC<IManageAnalyticsFilters> = ({
	duration,
	updateQueryFilters,
}) => {
	return (
		<div className={styles.filters}>
			<DurationFilter
				className={styles.filter}
				duration={duration}
				updateQueryFilters={updateQueryFilters}
			/>
		</div>
	)
}

export default ManageAnalyticsFilters
