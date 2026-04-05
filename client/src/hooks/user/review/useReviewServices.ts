import { Sort, Visibility, useServicesQuery } from '@/__generated__/output'
import { useSearchFilter } from '@/hooks/helpers/filters/useSearchFilter'
import { useState } from 'react'
import { useCreateReviewOffer } from './useCreateReviewOffer'

export const useReviewServices = (roomId: number) => {
	const { searchTerm, debounceSearch, handleSearch } = useSearchFilter()

	const [page, setPage] = useState('1')
	const [isShow, setIsShow] = useState(false)

	const openModal = () => setIsShow(true)
	const closeModal = () => setIsShow(false)

	const { createReviewOffer, loading } = useCreateReviewOffer(roomId, closeModal)

	const perPage = '9'

	const { data } = useServicesQuery({
		variables: {
			query: {
				searchTerm: debounceSearch,
				visibility: Visibility.Visible,
				sort: Sort.Desc,
				page,
				perPage,
			},
		},
	})

	return {
		searchTerm,
		handleSearch,
		page: +page,
		perPage: +perPage,
		setPage,
		services: data?.services.services || [],
		count: data?.services.count || 0,
		isShow,
		openModal,
		closeModal,
		createReviewOffer,
		loading,
	}
}
