import StaticImage from '@/components/ui/common/image/StaticImage'
import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { ChevronDown } from 'lucide-react'
import type { FC } from 'react'
import styles from './ExpandedHeaderProfile.module.scss'
import ExpandedHeaderProfileLogout from './logout/ExpandedHeaderProfileLogout'
import ExpandedHeaderProfileMenu from './menu/ExpandedHeaderProfileMenu'

const ExpandedHeaderProfile: FC<TypeExistUser> = ({ user }) => {
	return (
		<div className={styles.profile}>
			<div className={styles.toggle}>
				<div className={styles.avatar}>
					<StaticImage
						src={user.profile.avatarPath}
						width={36}
						height={36}
						alt={user.profile.login}
					/>
				</div>
				<ChevronDown size={17} />
				<Dropdown className={styles.dropdown}>
					<h2 className={styles.login}>{user.profile.login}</h2>
					<ExpandedHeaderProfileMenu />
					<ExpandedHeaderProfileLogout />
				</Dropdown>
			</div>
		</div>
	)
}

export default ExpandedHeaderProfile
