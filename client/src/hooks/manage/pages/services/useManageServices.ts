import {
	ServicesDocument,
	useCreateServiceMutation,
	useDeleteServiceMutation,
	useDuplicateServiceMutation,
	useServicesQuery,
	useToggleServiceMutation,
	type QueryFullestInput,
} from '@/__generated__/output'
import { ADMIN_EDITS } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useManageServices = (
	queryParams: QueryFullestInput,
	debounceSearch: string
) => {
	const { push } = useRouter()

	const { data } = useServicesQuery({
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

	const [createService] = useCreateServiceMutation({
		onCompleted: ({ createService }) => {
			toast.success('Услуга создана.')
			push(ADMIN_EDITS.SERVICE(createService.id))
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [deleteService] = useDeleteServiceMutation({
		refetchQueries: [ServicesDocument],
		onCompleted: () => {
			toast.success('Услуга удалена.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [toggleService] = useToggleServiceMutation({
		refetchQueries: [ServicesDocument],
		onCompleted: () => {
			toast.success('Статус видимости услуги обновлен.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const [duplicateService] = useDuplicateServiceMutation({
		refetchQueries: [ServicesDocument],
		onCompleted: () => {
			toast.success('Дубликат услуги создан.')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		services: data?.services.services || [],
		count: data?.services.count || 0,
		createService,
		deleteService,
		toggleService,
		duplicateService,
	}
}
