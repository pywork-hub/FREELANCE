import Container from '@/components/ui/common/container/Container'
import Logo from '@/components/ui/elements/logo/Logo'
import { getUser } from '@/server/auth/get-server-session'
import type { FC } from 'react'
import styles from './ExpandedHeaderTop.module.scss'
import ExpandedHeaderBurger from './burger/ExpandedHeaderBurger'
import ExpandedHeaderTopButtons from './buttons/ExpandedHeaderButtons'
import ExpandedHeaderMenu from './menu/ExpandedHeaderMenu'
import ExpandedHeaderNotifications from './notifications/ExpandedHeaderNotifications'
import ExpandedHeaderProfile from './profile/ExpandedHeaderProfile'
import ExpandedHeaderTopSearch from './search/ExpandedHeaderTopSearch'

const ExpandedHeaderTop: FC = async () => {
	const user = await getUser()

	return (
		<div className={styles.top}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.left}>
						<ExpandedHeaderBurger user={user} />
						<Logo width={108} height={24} className={styles.logo} />
						<ExpandedHeaderTopSearch />
					</div>
					<div className={styles.right}>
						{user ? (
							<>
								<ExpandedHeaderMenu />
								<ExpandedHeaderNotifications user={user} />
								<ExpandedHeaderProfile user={user} />
							</>
						) : (
							<ExpandedHeaderTopButtons />
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}

export default ExpandedHeaderTop
