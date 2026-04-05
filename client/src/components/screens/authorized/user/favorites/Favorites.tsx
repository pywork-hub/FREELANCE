import { Sort, Visibility } from '@/__generated__/output'
import Service from '@/components/parts/service/Service'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import ServerPagination from '@/components/ui/elements/pagination/server/ServerPagination'
import { useUserFavorites } from '@/hooks/user/favorites/useUserFavorites'
import { getExistUser } from '@/server/auth/get-server-session'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { FC } from 'react'
import styles from './Favorites.module.scss'

const Favorites: FC<IPageSearchParam> = async ({ searchParams }) => {
	const user = await getExistUser()

	const pagination = {
		page: searchParams?.page ? String(searchParams.page) : '1',
		perPage: searchParams?.perPage ? String(searchParams.perPage) : '20',
	}
	const { services, count } = await useUserFavorites({
		...pagination,
		sort: Sort.Desc,
		visibility: Visibility.Visible,
	})

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Избранное
					</Heading>
					{services.length > 0 ? (
						<>
							<div className={styles.services}>
								{services.map((service, index) => (
									<Service
										className={styles.service}
										// @ts-ignore
										service={service}
										user={user}
										key={index}
									/>
								))}
							</div>
							{count > +pagination.perPage && (
								<ServerPagination
									className={styles.pagination}
									length={count}
									page={+pagination.page}
									perPage={+pagination.perPage}
								/>
							)}
						</>
					) : (
						<p className={styles.notFound}>У вас нет избранных услуг.</p>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default Favorites
