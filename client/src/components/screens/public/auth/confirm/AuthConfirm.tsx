'use client'

import { useEffect, useState, type FC } from 'react'
import AuthConfirmWrapper from './wrapper/AuthConfirmWrapper'

const AuthConfirm: FC<{ token: string }> = ({ token }) => {
	const [isHydrated, setIsHydrated] = useState(false)

	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return isHydrated ? <AuthConfirmWrapper token={token} /> : null
}

export default AuthConfirm
