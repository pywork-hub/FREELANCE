import type { TypeAuth } from '@/shared/types/auth/auth.type'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useAuth = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const authType = searchParams ? searchParams.get('type') || 'login' : 'login'

	const isLogin = authType === 'login'
	const isRegister = authType === 'register'
	const isLost = authType === 'lost'

	const { push } = useRouter()

	const changeType = (type: TypeAuth) => {
		const newParams = new URLSearchParams(searchParams.toString())
		newParams.set('type', type)

		push(pathname + `?${newParams.toString()}`)
	}

	return { isLogin, isRegister, isLost, changeType }
}
