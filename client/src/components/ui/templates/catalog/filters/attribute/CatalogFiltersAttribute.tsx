import SearchField from '@/components/ui/common/form/search-field/SearchField'
import type { ICatalogFiltersAttribute } from '@/shared/interfaces/filter/filter.interface'
import cn from 'clsx'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from '../CatalogFilters.module.scss'

const CatalogFiltersAttribute: FC<ICatalogFiltersAttribute> = ({
	attribute,
	selectedProperties,
	updateQueryParams,
	removeQueryParam,
}) => {
	const [isShow, setIsShow] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className={styles.attribute}>
			<button className={styles.toggle} onClick={() => setIsShow(!isShow)}>
				<h4 className={styles.title}>{attribute.name}</h4>
				{isShow ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isShow && (
				<div className={styles.box}>
					<SearchField
						searchTerm={searchTerm}
						handleSearch={(e) => setSearchTerm(e.target.value)}
						className={styles.search}
						placeholder={`Найти ${attribute.name.toLowerCase()}`}
					/>
					<ul className={styles.list}>
						{attribute.properties
							.filter((property) =>
								property.name.toLowerCase().includes(searchTerm.toLowerCase())
							)
							.map((property, index) => (
								<li className={styles.item} key={index}>
									{selectedProperties.includes(property.slug) && (
										<button
											className={styles.remove}
											onClick={() =>
												removeQueryParam(attribute.slug, property.slug)
											}
										>
											<X />
										</button>
									)}
									<button
										className={cn(styles.link, {
											[styles.picked]: selectedProperties.includes(
												property.slug
											),
										})}
										onClick={() =>
											updateQueryParams(attribute.slug, property.slug, true)
										}
										disabled={selectedProperties.includes(property.slug)}
									>
										{property.name}
									</button>
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default CatalogFiltersAttribute
