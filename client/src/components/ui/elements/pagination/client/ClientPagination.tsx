import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IClientPagination } from '@/shared/interfaces/pagination/pagination.interface'
import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { FC } from 'react'
import styles from '../Pagination.module.scss'

const ClientPagination: FC<IClassName & IClientPagination> = ({
	page,
	perPage,
	length,
	goToPrev,
	goToNext,
	className,
}) => {
	const pages = length / perPage

	return (
		<div className={cn(styles.pagination, className && className)}>
			{page > 1 && (
				<button className={styles.button} onClick={goToPrev}>
					<ChevronLeft />
				</button>
			)}
			<div className={styles.number}>{page}</div>
			{page < pages && (
				<button className={styles.button} onClick={goToNext}>
					<ChevronRight />
				</button>
			)}
		</div>
	)
}

export default ClientPagination
