import SearchField from '@/components/ui/common/form/search-field/SearchField'
import Menu from '@/components/ui/elements/menu/Menu'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import type { ICatalogFiltersCategories } from '@/shared/interfaces/filter/filter.interface'
import type { IMenuItem } from '@/shared/interfaces/menu/menu.interface'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from '../CatalogFilters.module.scss'

const CatalogFiltersCategories: FC<ICatalogFiltersCategories> = ({
	categories,
}) => {
	if (categories.length === 0) return null

	const [isShow, setIsShow] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className={styles.categories}>
			<button className={styles.toggle} onClick={() => setIsShow(!isShow)}>
				<h3 className={styles.title}>Категории</h3>
				{isShow ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isShow && (
				<div className={styles.box}>
					<SearchField
						searchTerm={searchTerm}
						handleSearch={(e) => setSearchTerm(e.target.value)}
						className={styles.search}
						placeholder={`Найти категории`}
					/>
					<Menu
						listClassName={styles.list}
						itemClassName={styles.item}
						linkClassName={styles.link}
						items={categories
							.filter((property) =>
								property.name.toLowerCase().includes(searchTerm.toLowerCase())
							)
							.map(
								(category): IMenuItem => ({
									label: category.name,
									href: PUBLIC_PAGES.CATEGORY(category.slug),
								})
							)}
					/>
				</div>
			)}
		</div>
	)
}

export default CatalogFiltersCategories
