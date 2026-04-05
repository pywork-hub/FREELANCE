import type { FC } from 'react'
import styles from '../StorageSidebar.module.scss'
import type { IStorageMenuItem } from './interface/storage-menu.interface'
import StorageMenuItem from './item/StorageMenuItem'

const StorageMenu: FC<{ menu: IStorageMenuItem[] }> = ({ menu }) => {
	return (
		<ul className={styles.menu}>
			{menu.map((item, index) => (
				<StorageMenuItem key={index} item={item} />
			))}
		</ul>
	)
}

export default StorageMenu
