'use client'

import Example from '@/components/parts/example/Example'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFullestFilters from '@/components/ui/templates/manage/filters/fullest/ManageFullestFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFullestFilters } from '@/hooks/helpers/filters/useFullestFilters'
import { useManageExamples } from '@/hooks/manage/pages/examples/useManageExamples'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import { ListPlus } from 'lucide-react'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageExamples.module.scss'

const ManageExamples: FC<IPageSearchParam> = ({ searchParams }) => {
	const {
		page,
		perPage,
		queryParams,
		updateQueryFilters,
		handleSearch,
		searchTerm,
		debounceSearch,
	} = useFullestFilters({ searchParams })
	const {
		examples,
		count,
		createExample,
		deleteExample,
		toggleExample,
		duplicateExample,
	} = useManageExamples(queryParams, debounceSearch)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Примеры
					</Heading>
					<button
						className={globalStyles.create}
						onClick={() => createExample()}
					>
						<ListPlus />
						Создать Пример
					</button>
				</div>
				<ManageFullestFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.examples}>
							{examples.map((example) => (
								<Example
									key={example.id}
									className={styles.example}
									example={example}
									place="admin"
									deleteHandler={() =>
										deleteExample({
											variables: {
												id: example.id,
											},
										})
									}
									toggleHandler={() =>
										toggleExample({
											variables: {
												id: example.id,
											},
										})
									}
									duplicateHandler={() =>
										duplicateExample({
											variables: {
												id: example.id,
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

export default ManageExamples
