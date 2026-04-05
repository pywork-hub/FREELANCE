'use client'

import Request from '@/components/parts/request/Request'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFilters from '@/components/ui/templates/manage/filters/default/ManageFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFilters } from '@/hooks/helpers/filters/useFilters'
import { useManageRequests } from '@/hooks/manage/pages/requests/useManageRequests'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageRequests.module.scss'

const ManageRequests: FC<IPageSearchParam> = ({ searchParams }) => {
	const {
		queryParams,
		updateQueryFilters,
		handleSearch,
		searchTerm,
		debounceSearch,
		page,
		perPage,
	} = useFilters({ searchParams })
	const { requests, count, deleteRequest } = useManageRequests(
		queryParams,
		debounceSearch
	)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Обращения
					</Heading>
				</div>
				<ManageFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.requests}>
							{requests.map((request) => (
								<Request
									key={request.id}
									className={styles.request}
									request={request}
									deleteHandler={() =>
										deleteRequest({
											variables: {
												id: request.id,
											},
										})
									}
								/>
							))}
						</div>
						{count > +perPage && (
							<ServerPagination
								length={count}
								page={+page}
								perPage={+perPage}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ManageRequests
