'use client'

import type { IServiceAction } from '@/components/parts/service/actions/interface/service-action.interface'
import { useToggleFavorite } from '@/hooks/user/favorites/useToggleFavorite'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import cn from 'clsx'
import { Heart } from 'lucide-react'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import styles from '../SingleAboutActions.module.scss'

const SingleAddToFavorites: FC<IServiceAction & TypeExistUser> = ({
	isExist,
	slug,
	user,
}) => {
	const { toggleFavorite } = useToggleFavorite()

	return (
		<button
			onClick={() => {
				if (user.favorites.length === 100) {
					return toast.error('Можно добавить максимум 100 услуг в избранное.')
				} else {
					toggleFavorite(slug)
				}
			}}
			className={cn(styles.favorite, {
				[styles.picked]: isExist,
			})}
		>
			<Heart />
			<span>{isExist ? 'Удалить из избранных' : 'Добавить в избранное'}</span>
		</button>
	)
}

export default SingleAddToFavorites
