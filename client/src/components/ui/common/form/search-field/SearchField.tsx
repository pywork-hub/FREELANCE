'use client'

import { PUBLIC_PAGES } from '@/constants/url.constants'
import cn from 'clsx'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './SearchField.module.scss'
import type { TypeSearchField } from './interface/search-field.interface'

const SearchField: FC<TypeSearchField> = ({
	className,
	label,
	searchTerm,
	handleSearch,
	hasButton = false,
	...rest
}) => {
	const { push, refresh } = useRouter()

	return (
		<div className={cn(globalStyles.field, className && className)}>
			{label && <label className={globalStyles.label}>{label}</label>}
			<div className={styles.wrapper}>
				<div
					className={cn(styles.search, {
						[styles.full]: !hasButton,
						[styles.half]: hasButton,
					})}
				>
					<Search className={styles.icon} size={16} />
					<input
						className={styles.input}
						onChange={handleSearch}
						value={searchTerm}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && hasButton) {
								push(PUBLIC_PAGES.SEARCH(searchTerm))
								refresh()
							}
						}}
						{...rest}
					/>
				</div>
				{hasButton && (
					<button
						className={styles.button}
						onClick={() => {
							push(PUBLIC_PAGES.SEARCH(searchTerm))
							refresh()
						}}
					>
						<span>Найти</span>
						<Search />
					</button>
				)}
			</div>
		</div>
	)
}

export default SearchField
