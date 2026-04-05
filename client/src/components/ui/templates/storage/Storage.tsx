import cn from 'clsx'
import type { FC } from 'react'
import styles from './Storage.module.scss'
import StorageHeader from './header/StorageHeader'
import type { IStorage } from './interface/storage.interface'
import StorageSidebar from './sidebar/StorageSidebar'
import StorageWrapper from './wrapper/StorageWrapper'

const Storage: FC<IStorage> = ({
	className,
	pickedFiles,
	closeModal,
	onFileSelect,
}) => {
	return (
		<div className={cn(styles.storage, className && className)}>
			<StorageHeader closeModal={closeModal} />
			<div className={styles.fill}>
				<StorageSidebar />
				<StorageWrapper pickedFiles={pickedFiles} onFileSelect={onFileSelect} />
			</div>
		</div>
	)
}

export default Storage
