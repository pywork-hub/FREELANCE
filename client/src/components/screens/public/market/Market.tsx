'use client'

import { useCatalogServices } from '@/hooks/public/catalog/useCatalogServices'
import type { IMarket } from '@/shared/interfaces/market/market.interface'
import type { FC } from 'react'
import styles from './Market.module.scss'
import MarketAbout from './about/MarketAbout'
import MarketCategories from './categories/MarketCategories'
import MarketNotFound from './not-found/MarketNotFound'
import MarketServices from './services/MarketServices'

const Market: FC<IMarket> = ({
	block,
	filters,
	categories,
	user,
	slug,
}) => {
	const {
		services,
		count,
		error,
		loading,
		properties,
		page,
		perPage,
		setQuery,
		searchParams
	} = useCatalogServices(slug)

	return (
		<div className={styles.market}>
			<div className={styles.wrapper}>
				{categories.length > 0 && <MarketCategories categories={categories} />}
				{!error && (
					<>
						<MarketServices
							className={styles.filters}
							services={services}
							servicesCount={count}
							categories={categories}
							filters={filters}
							properties={properties}
							searchParams={searchParams}
							page={page}
							perPage={perPage}
							setQuery={setQuery}
							user={user}
							loading={loading}
						/>
						<MarketAbout block={block} />
						{count === 0 && !loading && <MarketNotFound />}
					</>
				)}
			</div>
		</div>
	)
}

export default Market
