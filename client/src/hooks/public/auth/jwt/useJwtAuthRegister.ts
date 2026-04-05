import { UserRole, useJwtRegisterQuery } from '@/__generated__/output'
import { ADMIN_PAGES, PUBLIC_PAGES } from '@/constants/url.constants'
import { setServerSession } from '@/server/auth/get-server-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useJwtAuthRegister = (token: string) => {
	const { replace, refresh } = useRouter()

	useEffect(() => {
		if (!token) {
			toast.error('Токен не найден.')
		}
	}, [])

	const { loading, error } = useJwtRegisterQuery({
		variables: {
			token,
		},
		skip: !token,
		onCompleted: async (data) => {
			if (!data.jwtRegister.user) {
				toast.error('Ошибка во время регистрации.')
				return
			}

			await setServerSession(data.jwtRegister.user)
			const isAdmin = data.jwtRegister.user.roles.includes(UserRole.Admin)
			replace(isAdmin ? ADMIN_PAGES.ANALYTICS : PUBLIC_PAGES.REDIRECT)
			refresh()
		},
		onError: ({ message }) => {
			toast.error(message)
		},
	})

	return {
		loading,
		error,
	}
}
