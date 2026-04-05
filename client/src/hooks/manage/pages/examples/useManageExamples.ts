import {
	ExamplesDocument,
	useCreateExampleMutation,
	useDeleteExampleMutation,
	useDuplicateExampleMutation,
	useExamplesQuery,
	useToggleExampleMutation,
	type QueryFullestInput,
} from '@/__generated__/output'
import { ADMIN_EDITS } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useManageExamples = (
	queryParams: QueryFullestInput,
	debounceSearch: string
) => {
	const { push } = useRouter()

	const { data } = useExamplesQuery({
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

	const [createExample] = useCreateExampleMutation({
		onCompleted: ({ createExample }) => {
			toast.success('Пример создан.')
			push(ADMIN_EDITS.EXAMPLE(createExample.id))
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [deleteExample] = useDeleteExampleMutation({
		refetchQueries: [ExamplesDocument],
		onCompleted: () => {
			toast.success('Пример удален.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [toggleExample] = useToggleExampleMutation({
		refetchQueries: [ExamplesDocument],
		onCompleted: () => {
			toast.success('Статус видимости примера обновлен.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [duplicateExample] = useDuplicateExampleMutation({
		refetchQueries: [ExamplesDocument],
		onCompleted: () => {
			toast.success('Дубликат примера создан.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		examples: data?.examples.examples || [],
		count: data?.examples.count || 0,
		createExample,
		deleteExample,
		toggleExample,
		duplicateExample,
	}
}
