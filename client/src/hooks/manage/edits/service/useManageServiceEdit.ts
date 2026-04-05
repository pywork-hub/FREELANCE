import {
	useServiceByIdQuery,
	useUpdateServiceMutation,
	type ServiceInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { getKeys } from '@/utils/helpers/get-keys.util'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManageServiceEdit = (queryId: string) => {
	const [isShow, setIsShow] = useState({
		seo: false,
		graphs: false,
	})
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		resetField
	} = useForm<ServiceInput>({
		mode: 'onChange',
	})

	const { push } = useRouter()
	const serviceId = +queryId

	const { data } = useServiceByIdQuery({
		variables: {
			id: serviceId,
		},
		skip: !serviceId,
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ serviceById }) => {
			const { categories, examples, properties, ...data } = serviceById
			getKeys(data).forEach(({ key, value }) => {
				setValue(key, value)
			})
			const selectedCategories = categories.map((category) => ({
				name: category.name,
				value: category.id,
			}))
			const selectedExamples = examples.map((example) => ({
				name: example.name,
				value: example.id,
			}))
			const selectedProperties = properties.map((property) => ({
				name: property.name,
				value: property.id,
			}))
			setValue('categories', selectedCategories)
			setValue('examples', selectedExamples)
			setValue('properties', selectedProperties)
			if (serviceById.seo) {
				const seo = serviceById.seo
				const keywords = seo.keywords.map((keyword) => ({
					name: keyword,
					value: keyword,
				}))
				setValue('seo.keywords', keywords)
				setIsShow({
					seo: true,
					graphs: seo.graphs ? true : false,
				})
			}
		},
	})

	const [updateService] = useUpdateServiceMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.SERVICES)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<ServiceInput> = async (data) => {
		await updateService({
			variables: {
				id: serviceId,
				data,
			},
		})
	}

	return {
		registerInput,
		control,
		errors,
		handleSubmit,
		onSubmit,
		data,
		isShow,
		setIsShow,
		resetField
	}
}
