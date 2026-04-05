'use client'

import { useToggleBodyOverflow } from '@/hooks/helpers/body/useToggleBodyOverflow'
import { useCatalogFilters } from '@/hooks/helpers/filters/useCatalogFilters'
import { useCatalogRangeFilters } from '@/hooks/helpers/filters/useCatalogRangeFilters'
import type { ICatalogCategories } from '@/shared/interfaces/category/category.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { ICatalogFilters } from '@/shared/interfaces/filter/filter.interface'
import cn from 'clsx'
import { SlidersHorizontal, X } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from './CatalogFilters.module.scss'
import CatalogFiltersAttribute from './attribute/CatalogFiltersAttribute'
import CatalogFiltersCategories from './categories/CatalogFiltersCategories'
import CatalogFiltersPrice from './price/CatalogFiltersPrice'
import CatalogFiltersTerm from './term/CatalogFiltersTerm'

const CatalogFilters: FC<ICatalogCategories & ICatalogFilters & IClassName> = ({
	categories,
	selectedProperties,
	filters,
	searchParams,
	className,
}) => {
	const [isShow, setIsShow] = useState(false)
	const { updateQueryParams, removeQueryParam, reset, params } =
		useCatalogFilters(filters.attributes, searchParams)
	useToggleBodyOverflow(isShow)
	const { values, errors, onChange } = useCatalogRangeFilters(
		filters,
		updateQueryParams,
		searchParams
	)
	if (
		categories.length === 0 &&
		filters.attributes.length === 0 &&
		filters.minPrice === 0
	)
		return null

	return (
		<>
			<button className={styles.opener} onClick={() => setIsShow(true)}>
				<SlidersHorizontal />
				Фильтры
			</button>
			<div
				className={cn(
					styles.wrapper,
					{
						[styles.opened]: isShow,
					},
					className && className
				)}
			>
				<div className={styles.top}>
					<span>Фильтры</span>
					<button className={styles.close} onClick={() => setIsShow(false)}>
						<X />
					</button>
				</div>
				{params.length > 0 && (
					<ul className={styles.options}>
						{params.map(({ key, value, label }, index) => (
							<li className={styles.option} key={index}>
								<button
									className={styles.optionBtn}
									onClick={() => removeQueryParam(key, value)}
								>
									<X />
									{label}
								</button>
							</li>
						))}
					</ul>
				)}
				<div className={styles.inner}>
					<CatalogFiltersCategories categories={categories} />
					{filters.minPrice > 0 && filters.maxPrice > 0 && (
						<CatalogFiltersPrice
							values={values}
							errors={errors}
							onChange={onChange}
						/>
					)}
					{filters.minTerm > 0 && filters.maxTerm > 0 && (
						<CatalogFiltersTerm
							values={values}
							errors={errors}
							onChange={onChange}
						/>
					)}
					{filters.attributes.length > 0 && (
						<div className={styles.attributes}>
							{filters.attributes.map((attribute, index) => (
								<CatalogFiltersAttribute
									key={index}
									attribute={attribute}
									selectedProperties={selectedProperties}
									updateQueryParams={updateQueryParams}
									removeQueryParam={removeQueryParam}
								/>
							))}
						</div>
					)}
					{params.length > 0 && (
						<div className={styles.reset}>
							<button className={styles.resetBtn} onClick={reset}>
								Сбросить Фильтры
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default CatalogFilters
