import {
	PageType,
	usePageQuery,
	useUpdatePageMutation,
	type PageInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { getKeys } from '@/utils/helpers/get-keys.util'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManagePageEdit = (type: PageType) => {
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
		resetField
	} = useForm<PageInput>({
		mode: 'onChange',
	})
	const blockItems = useFieldArray({
		control,
		name: 'block.items',
	})

	const { push } = useRouter()

	usePageQuery({
		variables: {
			type,
		},
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ page }) => {
			getKeys(page).forEach(({ key, value }) => {
				setValue(key, value)
			})
			if (page.seo) {
				const seo = page.seo
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
			if (page.block) {
				setIsShow((prev) => ({
					...prev,
					block: true,
				}))
			}
		},
	})

	const [updatePage] = useUpdatePageMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.ANALYTICS)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<PageInput> = async (data) => {
		await updatePage({
			variables: {
				type,
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
		resetField,
		blockItems,
		isShow,
		setIsShow,
	}
}
