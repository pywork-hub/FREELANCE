import SortFilter from '@/components/ui/elements/filters/sort/SortFilter'
import VisibilityFilter from '@/components/ui/elements/filters/visibility/VisibilityFilter'
import type { IManageFullestFilters } from '@/shared/interfaces/filter/filter.interface'
import type { FC } from 'react'
import styles from './ManageFullestFilters.module.scss'

const ManageFullestFilters: FC<IManageFullestFilters> = ({
	queryParams,
	updateQueryFilters,
}) => {
	return (
		<div className={styles.filters}>
			<SortFilter
				className={styles.filter}
				sort={queryParams.sort}
				updateQueryFilters={updateQueryFilters}
			/>
			<VisibilityFilter
				className={styles.filter}
				visibility={queryParams.visibility}
				updateQueryFilters={updateQueryFilters}
			/>
		</div>
	)
}

export default ManageFullestFilters
