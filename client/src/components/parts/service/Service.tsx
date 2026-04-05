'use client'

import StaticImage from '@/components/ui/common/image/StaticImage'
import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import { ADMIN_EDITS, PUBLIC_PAGES } from '@/constants/url.constants'
import { useHover } from '@/hooks/helpers/events/useHover'
import { useVideo } from '@/hooks/helpers/video/useVideo'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import type { IService } from '@/shared/interfaces/service/service.interface'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import { termFormat } from '@/utils/formats/term/term-format.util'
import cn from 'clsx'
import { CheckCheck, KeyRound, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, type FC } from 'react'
import styles from './Service.module.scss'
import ServiceAddToFavorites from './actions/add-to-favorites/ServiceAddToFavorites'
import ServiceOrder from './actions/order/ServiceOrder'

const Service: FC<IService & IManageItem & TypeIronUser & IClassName> = ({
	service,
	user,
	place = 'public',
	deleteHandler,
	duplicateHandler,
	toggleHandler,
	onClick,
	isClicked,
	className,
}) => {
	const { isHovered, ref } = useHover(false, 200)
	const { videoRef, startVideo } = useVideo()

	useEffect(() => {
		if (isHovered) {
			startVideo()
		}
	}, [isHovered])

	return (
		<li
			className={cn(
				styles.service,
				className && className
			)}
			onClick={onClick}
			ref={ref}
		>
			<div className={styles.head}>
				<Link
					className={styles.preview}
					href={PUBLIC_PAGES.SERVICE(service.slug)}
				>
					{isHovered && (
						<video ref={videoRef}>
							<source src={service.videoPath} />
						</video>
					)}
					<StaticImage
						className={isHovered ? styles.hovered : ''}
						src={service.coverPath}
						width={400}
						height={300}
						alt={service.name}
					/>
					{service.averageRating !== 0 && (
						<div className={styles.average}>
							<Star />
							<span>{service.averageRating}</span>
						</div>
					)}
					{isClicked && (
						<div className={styles.clicked}>
							<CheckCheck />
						</div>
					)}
				</Link>
				{user && (
					<ServiceAddToFavorites
						user={user}
						slug={service.slug}
						isExist={
							user.favorites.length > 0
								? user.favorites.some(
										(favorite) => favorite.slug === service.slug
								  )
								: false
						}
					/>
				)}
			</div>
			<div className={styles.box}>
				<Link
					href={PUBLIC_PAGES.SERVICE(service.slug)}
					className={styles.heading}
				>
					<h3 className={styles.name}>{service.name}</h3>
				</Link>
				<div
					className={styles.excerpt}
					dangerouslySetInnerHTML={{ __html: service.excerpt }}
				/>
				{service.categories.length > 0 && (
					<ul className={styles.categories}>
						{service.categories.map((category, index) => (
							<li className={styles.category} key={index}>
								<Link
									className={styles.categoryLink}
									href={PUBLIC_PAGES.CATEGORY(category.slug)}
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				)}
				<div className={styles.info}>
					<div className={styles.priceInfo}>
						<span className={styles.priceFrom}>Мин. Цена: </span>
						{service.fromSalePrice ? (
							<div className={styles.saleBox}>
								<span className={styles.price}>{service.fromPrice} ₽</span>
								<span className={styles.percent}>
									{Math.round(
										-100 + (service.fromSalePrice * 100) / service.fromPrice
									)}
									%
								</span>
								<span className={styles.salePrice}>
									{service.fromSalePrice} ₽
								</span>
							</div>
						) : (
							<div className={styles.priceBox}>
								<span className={styles.price}>{service.fromPrice} ₽</span>
							</div>
						)}
					</div>
					<div className={styles.termForm}>
						Мин. Срок:{' '}
						<span className={styles.termDays}>
							{termFormat(service.fromTerm)}
						</span>
					</div>
				</div>
				<div className={styles.actions}>
					{user ? (
						<>
							<ServiceOrder slug={service.slug} />
							<ServiceAddToFavorites
								user={user}
								slug={service.slug}
								isExist={
									user.favorites.length > 0
										? user.favorites.some(
												(favorite) => favorite.slug === service.slug
										  )
										: false
								}
							/>
						</>
					) : (
						<Link href={PUBLIC_PAGES.REGISTER} className={styles.register}>
							<KeyRound />
							Войти
						</Link>
					)}
				</div>
			</div>
			<ManageActions
				place={place}
				editUrl={ADMIN_EDITS.SERVICE(service.id)}
				visibility={service.visibility}
				toggleHandler={toggleHandler}
				duplicateHandler={duplicateHandler}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default Service
