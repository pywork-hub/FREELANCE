import {
	useUpdateProfileMutation,
	type ProfileInput,
} from '@/__generated__/output'
import { setServerSession } from '@/server/auth/get-server-session'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useUpdateProfile = (login: string) => {
	const {
		register: registerInput,
		formState: { errors },
		handleSubmit,
		control,
		setValue,
	} = useForm<ProfileInput>({
		mode: 'onChange',
		defaultValues: {
			avatarFile: undefined,
		},
	})

	useEffect(() => {
		setValue('login', login)
	}, [login])

	const [updateProfile, { loading }] = useUpdateProfileMutation()

	const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
		await updateProfile({
			variables: { data },
			onCompleted: ({ updateProfile }) => {
				setServerSession(updateProfile.user)
				setValue('avatarFile', undefined)
				toast.success('Профиль успешно обновлен.')
			},
			onError: (error) => {
				error.graphQLErrors.map((error) => {
					if (error.extensions.code === 'BAD_REQUEST') {
						toast.error(error.message)
					} else {
						toast.error('Произошла ошибка.')
					}
				})
			},
		})
	}

	return { registerInput, control, errors, handleSubmit, onSubmit, loading }
}
