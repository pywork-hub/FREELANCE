import { useState, type ChangeEvent } from 'react'
import { useDebounce } from '../../helpers/debounce/useDebounce'

export const useSearchFilter = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return {
		handleSearch,
		searchTerm,
		debounceSearch,
	}
}
