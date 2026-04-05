import {
	CategoriesDocument,
	useCategoriesQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useDuplicateCategoryMutation,
	useToggleCategoryMutation,
	type QueryFullestInput,
} from '@/__generated__/output'
import { ADMIN_EDITS } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useManageCategories = (
	queryParams: QueryFullestInput,
	debounceSearch: string,
	parentSlug?: string
) => {
	const { push } = useRouter()

	const { data } = useCategoriesQuery({
		variables: {
			query: {
				...queryParams,
				...(parentSlug ? { parentSlug } : { isParents: true }),
				searchTerm: debounceSearch,
			},
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [createCategory] = useCreateCategoryMutation({
		onCompleted: ({ createCategory }) => {
			toast.success('Категория создана.')
			push(ADMIN_EDITS.CATEGORY(createCategory.id))
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [deleteCategory] = useDeleteCategoryMutation({
		refetchQueries: [CategoriesDocument],
		onCompleted: () => {
			toast.success('Категория удалена.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [toggleCategory] = useToggleCategoryMutation({
		refetchQueries: [CategoriesDocument],
		onCompleted: () => {
			toast.success('Статус видимости категории обновлен.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [duplicateCategory] = useDuplicateCategoryMutation({
		refetchQueries: [CategoriesDocument],
		onCompleted: () => {
			toast.success('Дубликат категории создан.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		categories: data?.categories.categories || [],
		count: data?.categories.count || 0,
		createCategory,
		deleteCategory,
		toggleCategory,
		duplicateCategory,
	}
}
