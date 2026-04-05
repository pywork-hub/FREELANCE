import {
	Sort,
	Visibility,
	useAddExampleMutation,
	useServicesQuery,
	type AddExampleInput,
} from '@/__generated__/output'
import { useSearchFilter } from '@/hooks/helpers/filters/useSearchFilter'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useAddExample = (userId: number) => {
	const {
		register: registerInput,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
	} = useForm<AddExampleInput>({
		mode: 'onChange',
		defaultValues: {
			userId
		}
	})

	const { searchTerm, debounceSearch, handleSearch } = useSearchFilter()

	const [page, setPage] = useState('1')
	const [isShow, setIsShow] = useState(false)
	const [isClicked, setIsClicked] = useState(false)

	const openModal = () => setIsShow(true)
	const closeModal = () => setIsShow(false)

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

	const [addExample, { loading }] = useAddExampleMutation({
		onCompleted: ({ addExample }) => {
			if (addExample.id) {
				toast.success('Пример успешно создан.')
				closeModal()
				return
			}

			toast.error('Ошибка при создании примера.')
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	const onSubmit: SubmitHandler<AddExampleInput> = async (data) => {
		if (!data.serviceId) {
			toast.error('Выберите услугу.')
			return
		}

		await addExample({
			variables: {
				data,
			},
		})
	}

	return {
		searchTerm,
		handleSearch,
		page: +page,
		perPage: +perPage,
		setPage,
		services: data?.services.services || [],
		count: data?.services.count || 0,
		isShow,
		isClicked,
		setIsClicked,
		openModal,
		closeModal,
		registerInput,
		errors,
		handleSubmit,
		onSubmit,
		loading,
		setValue,
		watch
	}
}
