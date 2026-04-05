'use client'

import type { IMenuItem } from '@/shared/interfaces/menu/menu.interface'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'
import styles from '../ManageMenu.module.scss'

const ManageMenuItem: FC<{ item: IMenuItem }> = ({ item: { label, href } }) => {
	const pathname = usePathname()

	return (
		<li className={styles.item}>
			<Link
				className={cn(styles.link, {
					[styles.current]: pathname === href,
				})}
				href={href}
			>
				{label}
			</Link>
		</li>
	)
}

export default ManageMenuItem
