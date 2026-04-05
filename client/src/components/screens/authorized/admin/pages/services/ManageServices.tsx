'use client'

import Service from '@/components/parts/service/Service'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFullestFilters from '@/components/ui/templates/manage/filters/fullest/ManageFullestFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFullestFilters } from '@/hooks/helpers/filters/useFullestFilters'
import { useManageServices } from '@/hooks/manage/pages/services/useManageServices'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import { ListPlus } from 'lucide-react'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageServices.module.scss'

const ManageServices: FC<IPageSearchParam & TypeIronUser> = ({
	searchParams,
	user,
}) => {
	const {
		queryParams,
		updateQueryFilters,
		handleSearch,
		searchTerm,
		debounceSearch,
		page,
		perPage,
	} = useFullestFilters({ searchParams })
	const {
		services,
		count,
		createService,
		deleteService,
		toggleService,
		duplicateService,
	} = useManageServices(queryParams, debounceSearch)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Услуги
					</Heading>
					<button
						className={globalStyles.create}
						onClick={() => createService()}
					>
						<ListPlus />
						Создать Услугу
					</button>
				</div>
				<ManageFullestFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.services}>
							{services.map((service) => (
								<Service
									key={service.id}
									className={styles.service}
									service={service}
									user={user}
									place="admin"
									deleteHandler={() =>
										deleteService({
											variables: {
												id: service.id,
											},
										})
									}
									toggleHandler={() =>
										toggleService({
											variables: {
												id: service.id,
											},
										})
									}
									duplicateHandler={() =>
										duplicateService({
											variables: {
												id: service.id,
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

export default ManageServices
