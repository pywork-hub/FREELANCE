import SortFilter from '@/components/ui/elements/filters/sort/SortFilter'
import type { FC } from 'react'
import styles from './ManageFilters.module.scss'
import type { IManageFilters } from '@/shared/interfaces/filter/filter.interface'

const ManageFilters: FC<IManageFilters> = ({
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
		</div>
	)
}

export default ManageFilters
