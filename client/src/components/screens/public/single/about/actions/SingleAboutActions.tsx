import { PUBLIC_PAGES } from '@/constants/url.constants'
import { getUser } from '@/server/auth/get-server-session'
import type { ICurrentService } from '@/shared/interfaces/service/service.interface'
import { KeyRound } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './SingleAboutActions.module.scss'
import SingleAddToFavorites from './add-to-favorites/SingleAddToFavorites'
import SingleOrder from './order/SingleOrder'

const SingleAboutActions: FC<ICurrentService> = async ({ service }) => {
	const user = await getUser()

	if (!user) {
		return (
			<div className={styles.wrapper}>
				<Link href={PUBLIC_PAGES.REGISTER} className={styles.register}>
					<KeyRound />
					Войти
				</Link>
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<SingleAddToFavorites
				user={user}
				slug={service.slug}
				isExist={
					user.favorites.length > 0
						? user.favorites.some((favorite) => favorite.slug === service.slug)
						: false
				}
			/>
			<SingleOrder slug={service.slug} />
		</div>
	)
}

export default SingleAboutActions
