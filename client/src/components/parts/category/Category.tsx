import StaticImage from '@/components/ui/common/image/StaticImage'
import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import {
	ADMIN_CHILDRENS,
	ADMIN_EDITS,
	PUBLIC_PAGES,
} from '@/constants/url.constants'
import type { ICategory } from '@/shared/interfaces/category/category.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import cn from 'clsx'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Category.module.scss'

const Category: FC<ICategory & IManageItem & IClassName> = ({
	category,
	place = 'public',
	deleteHandler,
	duplicateHandler,
	toggleHandler,
	className,
}) => {
	return (
		<li className={cn(styles.category, className && className)}>
			<Link className={styles.link} href={PUBLIC_PAGES.CATEGORY(category.slug)}>
				<div className={styles.box}>
					<h3 className={styles.name}>{category.name}</h3>
				</div>
				<StaticImage
					src={category.coverPath}
					width={320}
					height={220}
					alt={category.name}
				/>
			</Link>
			<ManageActions
				place={place}
				childrensUrl={ADMIN_CHILDRENS.CATEGORY(category.slug)}
				editUrl={ADMIN_EDITS.CATEGORY(category.id)}
				visibility={category.visibility}
				toggleHandler={toggleHandler}
				duplicateHandler={duplicateHandler}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default Category
