import {
	RequestsDocument,
	useDeleteRequestMutation,
	useRequestsQuery,
	type QueryInput,
} from '@/__generated__/output'
import toast from 'react-hot-toast'

export const useManageRequests = (
	queryParams: QueryInput,
	debounceSearch: string
) => {
	const { data } = useRequestsQuery({
		variables: {
			query: {
				...queryParams,
				searchTerm: debounceSearch,
			},
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [deleteRequest] = useDeleteRequestMutation({
		refetchQueries: [RequestsDocument],
		onCompleted: () => {
			toast.success('Обращение удалено.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		requests: data?.requests.requests || [],
		count: data?.requests.count || 0,
		deleteRequest,
	}
}
