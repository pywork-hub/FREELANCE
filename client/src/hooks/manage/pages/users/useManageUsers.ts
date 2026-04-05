import {
	UsersDocument,
	useDeleteUserMutation,
	useUsersQuery,
	type QueryInput,
} from '@/__generated__/output'
import toast from 'react-hot-toast'

export const useManageUsers = (
	queryParams: QueryInput,
	debounceSearch: string
) => {
	const { data } = useUsersQuery({
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

	const [deleteUser] = useDeleteUserMutation({
		refetchQueries: [UsersDocument],
		onCompleted: () => {
			toast.success('Пользователь удален.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		users: data?.users.users || [],
		count: data?.users.count || 0,
		deleteUser,
	}
}
