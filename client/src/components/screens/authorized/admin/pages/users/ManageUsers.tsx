'use client'

import User from '@/components/parts/user/User'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFilters from '@/components/ui/templates/manage/filters/default/ManageFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFilters } from '@/hooks/helpers/filters/useFilters'
import { useManageUsers } from '@/hooks/manage/pages/users/useManageUsers'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageUsers.module.scss'

const ManageUsers: FC<IPageSearchParam> = ({ searchParams }) => {
	const {
		queryParams,
		updateQueryFilters,
		handleSearch,
		searchTerm,
		debounceSearch,
		page,
		perPage,
	} = useFilters({ searchParams })
	const { users, count, deleteUser } = useManageUsers(
		queryParams,
		debounceSearch
	)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Пользователи
					</Heading>
				</div>
				<ManageFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.users}>
							{users.map((user) => (
								<User
									key={user.id}
									className={styles.user}
									user={user}
									place="admin"
									deleteHandler={() =>
										deleteUser({
											variables: {
												id: user.id,
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

export default ManageUsers
