import {
	AttributesDocument,
	useAttributesQuery,
	useCreateAttributeMutation,
	useDeleteAttributeMutation,
	useDuplicateAttributeMutation,
	type QueryInput,
} from '@/__generated__/output'
import { ADMIN_EDITS } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useManageAttributes = (
	queryParams: QueryInput,
	debounceSearch: string
) => {
	const { push } = useRouter()

	const { data } = useAttributesQuery({
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

	const [createAttribute] = useCreateAttributeMutation({
		onCompleted: ({ createAttribute }) => {
			toast.success('Характеристика создана.')
			push(ADMIN_EDITS.ATTRIBUTE(createAttribute.id))
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [deleteAttribute] = useDeleteAttributeMutation({
		refetchQueries: [AttributesDocument],
		onCompleted: () => {
			toast.success('Характеристика удалена.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [duplicateAttribute] = useDuplicateAttributeMutation({
		refetchQueries: [AttributesDocument],
		onCompleted: () => {
			toast.success('Дубликат характеристики создан.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		attributes: data?.attributes.attributes || [],
		count: data?.attributes.count || 0,
		createAttribute,
		deleteAttribute,
		duplicateAttribute,
	}
}
