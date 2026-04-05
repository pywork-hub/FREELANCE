'use client'

import Attribute from '@/components/parts/attribute/Attribute'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFilters from '@/components/ui/templates/manage/filters/default/ManageFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFilters } from '@/hooks/helpers/filters/useFilters'
import { useManageAttributes } from '@/hooks/manage/pages/attributes/useManageAttributes'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import { ListPlus } from 'lucide-react'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageAttributes.module.scss'

const ManageAttributes: FC<IPageSearchParam> = ({ searchParams }) => {
	const {
		page,
		perPage,
		queryParams,
		updateQueryFilters,
		handleSearch,
		searchTerm,
		debounceSearch,
	} = useFilters({ searchParams })
	const {
		attributes,
		count,
		createAttribute,
		deleteAttribute,
		duplicateAttribute,
	} = useManageAttributes(queryParams, debounceSearch)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Характеристики
					</Heading>
					<button
						className={globalStyles.create}
						onClick={() => createAttribute()}
					>
						<ListPlus />
						Создать Характеристику
					</button>
				</div>
				<ManageFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.attributes}>
							{attributes.map((attribute) => (
								<Attribute
									key={attribute.id}
									className={styles.attribute}
									attribute={attribute}
									place="admin"
									deleteHandler={() =>
										deleteAttribute({
											variables: {
												id: attribute.id,
											},
										})
									}
									duplicateHandler={() =>
										duplicateAttribute({
											variables: {
												id: attribute.id,
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

export default ManageAttributes
