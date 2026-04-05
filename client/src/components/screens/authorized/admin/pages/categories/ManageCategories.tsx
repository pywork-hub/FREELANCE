'use client'

import Category from '@/components/parts/category/Category'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import ManageFullestFilters from '@/components/ui/templates/manage/filters/fullest/ManageFullestFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useFullestFilters } from '@/hooks/helpers/filters/useFullestFilters'
import { useManageCategories } from '@/hooks/manage/pages/categories/useManageCategories'
import type {
	IPageSearchParam,
	IPageSlug,
} from '@/shared/interfaces/param/param.interface'
import { ListPlus } from 'lucide-react'
import type { FC } from 'react'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageCategories.module.scss'

const ManageCategories: FC<IPageSearchParam & IPageSlug> = ({
	searchParams,
	slug,
}) => {
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
		categories,
		count,
		createCategory,
		deleteCategory,
		toggleCategory,
		duplicateCategory,
	} = useManageCategories(queryParams, debounceSearch, slug)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						Категории
					</Heading>
					<button
						className={globalStyles.create}
						onClick={() => createCategory()}
					>
						<ListPlus />
						Создать Категорию
					</button>
				</div>
				<ManageFullestFilters
					queryParams={queryParams}
					updateQueryFilters={updateQueryFilters}
				/>
				{count > 0 && (
					<div className={globalStyles.fill}>
						<div className={styles.categories}>
							{categories.map((category) => (
								<Category
									key={category.id}
									className={styles.category}
									category={category}
									place="admin"
									deleteHandler={() =>
										deleteCategory({
											variables: {
												id: category.id,
											},
										})
									}
									toggleHandler={() =>
										toggleCategory({
											variables: {
												id: category.id,
											},
										})
									}
									duplicateHandler={() =>
										duplicateCategory({
											variables: {
												id: category.id,
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

export default ManageCategories
