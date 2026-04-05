import { Sort, type QueryInput } from '@/__generated__/output'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import { useState } from 'react'
import { useSearchFilter } from './useSearchFilter'

export const useFilters = ({ searchParams }: IPageSearchParam) => {
	const { searchTerm, debounceSearch, handleSearch } = useSearchFilter()
	const page = String(searchParams?.page ? searchParams.page : 1)
	const perPage = String(searchParams?.perPage ? searchParams.perPage : 20)

	const [queryParams, setQueryParams] = useState<QueryInput>({
		searchTerm,
		sort: Sort.Desc,
		page,
		perPage,
	})

	const updateQueryFilters = (key: string, value: string | null) => {
		setQueryParams((prevParams) => ({ ...prevParams, [key]: value }))
	}

	return {
		page,
		perPage,
		updateQueryFilters,
		handleSearch,
		queryParams,
		searchTerm,
		debounceSearch,
	}
}
