import type { FC } from 'react'
import styles from './StorageSidebar.module.scss'
import StorageMenu from './menu/StorageMenu'
import { STORAGE_MENU_DATA } from './menu/data/storage-menu.data'

const StorageSidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<StorageMenu menu={STORAGE_MENU_DATA} />
		</div>
	)
}

export default StorageSidebar
