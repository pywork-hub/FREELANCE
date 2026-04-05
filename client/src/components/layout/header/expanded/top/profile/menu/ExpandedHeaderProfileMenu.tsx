import Link from 'next/link'
import type { FC } from 'react'
import styles from '../ExpandedHeaderProfile.module.scss'
import { EXPANDED_HEADER_PROFILE_MENU_DATA } from './data/expanded-header-profile-menu.data'

const ExpandedHeaderProfileMenu: FC = () => {
	return (
		<ul className={styles.list}>
			{EXPANDED_HEADER_PROFILE_MENU_DATA.items.map((item, index) => (
				<li className={styles.item} key={index}>
					<Link href={item.href} className={styles.link}>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default ExpandedHeaderProfileMenu
