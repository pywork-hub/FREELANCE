import { useLogoutClient } from '@/hooks/public/auth/useLogout'
import { Power } from 'lucide-react'
import type { FC } from 'react'
import styles from '../ExpandedHeaderBurger.module.scss'

const ExpandedHeaderBurgerLogout: FC = () => {
	const { logout } = useLogoutClient()

	return (
		<button className={styles.logout} onClick={logout}>
			<Power />
			Выйти
		</button>
	)
}

export default ExpandedHeaderBurgerLogout
