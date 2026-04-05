'use client'

import { useToggleFavorite } from '@/hooks/user/favorites/useToggleFavorite'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import cn from 'clsx'
import { Heart } from 'lucide-react'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import styles from '../../Service.module.scss'
import type { IServiceAction } from '../interface/service-action.interface'

const ServiceAddToFavorites: FC<IServiceAction & TypeExistUser> = ({
	isExist,
	slug,
	user,
}) => {
	const { toggleFavorite } = useToggleFavorite()

	return (
		<button
			onClick={() => {
				if (user.favorites.length === 100) {
					return toast.error(
						'Можно добавить максимум 100 услуг в избранное.'
					)
				} else {
					toggleFavorite(slug)
				}
			}}
			className={cn(styles.favorite, {
				[styles.picked]: isExist,
			})}
		>
			<Heart />
		</button>
	)
}

export default ServiceAddToFavorites
