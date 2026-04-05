import {
	UserRole,
	useJwtLoginMutation,
	type JwtAuthLoginInput,
} from '@/__generated__/output'
import { ADMIN_PAGES, PUBLIC_PAGES } from '@/constants/url.constants'
import { setServerSession } from '@/server/auth/get-server-session'
import { useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useJwtAuthLogin = () => {
	const {
		register: registerInput,
		formState: { errors },
		handleSubmit,
	} = useForm<JwtAuthLoginInput>({
		mode: 'onChange',
	})

	const { replace, refresh } = useRouter()

	const [login, { loading }] = useJwtLoginMutation()

	const onSubmit: SubmitHandler<JwtAuthLoginInput> = async (data) => {
		await login({
			variables: { data },
			onCompleted: async (data) => {
				if (!data.jwtLogin) {
					toast.error('Ошибка во время входа в систему.')
					return
				}
				await setServerSession(data.jwtLogin.user)
				const isAdmin = data.jwtLogin.user.roles.includes(UserRole.Admin)
				replace(isAdmin ? ADMIN_PAGES.ANALYTICS : PUBLIC_PAGES.REDIRECT)
				refresh()
			},
			onError: ({ message }) => {
				toast.error(message)
			},
		})
	}

	return { registerInput, errors, handleSubmit, onSubmit, loading }
}
