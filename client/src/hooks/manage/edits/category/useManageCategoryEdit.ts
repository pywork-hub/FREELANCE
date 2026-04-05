import {
	useCategoryByIdQuery,
	useUpdateCategoryMutation,
	type CategoryInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { getKeys } from '@/utils/helpers/get-keys.util'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManageCategoryEdit = (queryId: string) => {
	const [isShow, setIsShow] = useState({
		seo: false,
		graphs: false,
		block: false,
	})
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		resetField,
	} = useForm<CategoryInput>({
		mode: 'onChange',
	})
	const blockItems = useFieldArray({
		control,
		name: 'block.items',
	})

	const { push } = useRouter()
	const categoryId = +queryId

	const { data } = useCategoryByIdQuery({
		variables: {
			id: categoryId,
		},
		skip: !categoryId,
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ categoryById }) => {
			const { parents, ...response } = categoryById
			const selectedParents = parents.map((parent) => ({
				name: parent.name,
				value: parent.id,
			}))
			getKeys(response).forEach(({ key, value }) => {
				setValue(key, value)
			})
			setValue('parents', selectedParents)
			if (response.seo) {
				const seo = response.seo
				const keywords = seo.keywords.map((keyword) => ({
					name: keyword,
					value: keyword,
				}))
				setValue('seo.keywords', keywords)
				setIsShow((prev) => ({
					...prev,
					seo: true,
					graphs: seo.graphs ? true : false,
				}))
			}
			if (response.block) {
				setIsShow((prev) => ({
					...prev,
					block: true,
				}))
			}
		},
	})

	const [updateCategory] = useUpdateCategoryMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.CATEGORIES)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
		await updateCategory({
			variables: {
				id: categoryId,
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
		resetField,
		blockItems,
	}
}
