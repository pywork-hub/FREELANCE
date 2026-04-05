import {
	useUpdateUserMutation,
	useUserByIdQuery,
	type UserInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { getKeys } from '@/utils/helpers/get-keys.util'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManageUserEdit = (queryId: string) => {
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<UserInput>({
		mode: 'onChange',
	})
	const bots = useFieldArray({
		control,
		name: 'bots',
	})

	const { push } = useRouter()
	const userId = +queryId

	const { data } = useUserByIdQuery({
		variables: {
			id: userId,
		},
		skip: !userId,
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ userById }) => {
			const { roles, profile, ...response } = userById
			const selectedRoles = roles.map((role) => ({
				name: role,
				value: role,
			}))
			setValue('roles', selectedRoles)
			getKeys(response).forEach(({ key, value }) => {
				setValue(key, value)
			})
		},
	})

	const [updateUser] = useUpdateUserMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.USERS)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<UserInput> = async (data) => {
		await updateUser({
			variables: {
				id: userId,
				data,
			},
		})
	}

	return { registerInput, control, errors, handleSubmit, onSubmit, data, bots }
}
