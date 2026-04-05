'use client'

import { useServerPagination } from '@/hooks/helpers/pagination/useServerPagination'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IServerPagination } from '@/shared/interfaces/pagination/pagination.interface'
import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { FC } from 'react'
import styles from '../Pagination.module.scss'

const ServerPagination: FC<IServerPagination & IClassName> = ({
	length,
	page,
	perPage,
	className,
}) => {
	const { goToPreviousPage, goToNextPage } = useServerPagination({
		length,
		page,
		perPage,
	})

	const pages = length / perPage

	return (
		<div className={cn(styles.pagination, className && className)}>
			{page > 1 && (
				<button className={styles.button} onClick={goToPreviousPage}>
					<ChevronLeft />
				</button>
			)}
			<div className={styles.number}>{page}</div>
			{page < pages && (
				<button className={styles.button} onClick={goToNextPage}>
					<ChevronRight />
				</button>
			)}
		</div>
	)
}

export default ServerPagination
