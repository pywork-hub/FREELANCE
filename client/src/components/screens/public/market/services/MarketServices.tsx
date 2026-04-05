import Service from '@/components/parts/service/Service'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import ClientPagination from '@/components/ui/elements/pagination/client/ClientPagination'
import CatalogFilters from '@/components/ui/templates/catalog/filters/CatalogFilters'
import type { IMarketServices } from '@/shared/interfaces/market/market.interface'
import type { TypeRequiredPagination } from '@/shared/types/pagination/pagination.type'
import type { FC } from 'react'
import styles from './MarketServices.module.scss'

const MarketServices: FC<IMarketServices & TypeRequiredPagination> = ({
	services,
	servicesCount,
	categories,
	filters,
	properties,
	perPage,
	page,
	searchParams,
	user,
	setQuery,
	loading,
	className,
}) => {
	if(!loading && servicesCount === 0) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<CatalogFilters
						categories={categories}
						filters={filters}
						selectedProperties={properties}
						searchParams={searchParams}
						className={className}
					/>
					<div className={styles.catalog}>
						{loading ? (
							<div className={styles.loader}>
								<MiniLoader />
							</div>
						) : (
							<>
								<ul className={styles.services}>
									{services.map((service, index) => (
										<Service
											key={index}
											user={user}
											// @ts-ignore
											service={service}
											className={styles.service}
										/>
									))}
								</ul>
								{servicesCount > +perPage && (
									<ClientPagination
										length={servicesCount}
										page={+page}
										perPage={+perPage}
										goToPrev={() =>
											setQuery((prev) => ({
												...prev,
												page: +page > 1 ? String(+page - 1) : page,
											}))
										}
										goToNext={() =>
											setQuery((prev) => ({
												...prev,
												page: +page < servicesCount ? String(+page + 1) : page,
											}))
										}
										className={styles.pagination}
									/>
								)}
							</>
						)}
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default MarketServices
