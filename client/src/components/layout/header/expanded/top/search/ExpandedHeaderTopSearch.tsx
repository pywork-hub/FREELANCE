'use client'

import SearchField from '@/components/ui/common/form/search-field/SearchField'
import { useSearchFilter } from '@/hooks/helpers/filters/useSearchFilter'
import type { FC } from 'react'
import styles from '../ExpandedHeaderTop.module.scss'

const ExpandedHeaderTopSearch: FC = () => {
	const { searchTerm, handleSearch } = useSearchFilter()

	return (
		<SearchField
			className={styles.search}
			hasButton
			placeholder="Поиск"
			searchTerm={searchTerm}
			handleSearch={handleSearch}
		/>
	)
}

export default ExpandedHeaderTopSearch
