'use client'

import { useLogoutClient } from '@/hooks/public/auth/useLogout'
import type { FC } from 'react'
import styles from '../ExpandedHeaderProfile.module.scss'

const ExpandedHeaderProfileLogout: FC = () => {
	const { logout } = useLogoutClient()

	return (
		<button className={styles.logout} onClick={logout}>
			Выйти
		</button>
	)
}

export default ExpandedHeaderProfileLogout
