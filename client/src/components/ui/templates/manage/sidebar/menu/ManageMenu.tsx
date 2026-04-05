import type { IMenu } from '@/shared/interfaces/menu/menu.interface'
import type { FC } from 'react'
import styles from './ManageMenu.module.scss'
import ManageMenuItem from './item/ManageMenuItem'

const ManageMenu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.menu}>
				{items.map((item, index) => (
					<ManageMenuItem key={index} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default ManageMenu
