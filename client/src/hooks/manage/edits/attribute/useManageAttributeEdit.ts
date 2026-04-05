import {
	useAttributeByIdQuery,
	useUpdateAttributeMutation,
	type AttributeInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManageAttributeEdit = (queryId: string) => {
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<AttributeInput>({
		mode: 'onChange',
	})

	const { push } = useRouter()
	const attributeId = +queryId

	const { data } = useAttributeByIdQuery({
		variables: {
			id: attributeId,
		},
		skip: !attributeId,
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ attributeById }) => {
			const properties = attributeById.properties.map((property) => ({
				name: property.name,
				value: property.name,
			}))
			setValue('properties', properties)
			setValue('name', attributeById.name)
		},
	})

	const [updateAttribute] = useUpdateAttributeMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.ATTRIBUTES)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<AttributeInput> = async (data) => {
		await updateAttribute({
			variables: {
				id: attributeId,
				data,
			},
		})
	}

	return { registerInput, control, errors, handleSubmit, onSubmit, data }
}
