import { Folder, X } from 'lucide-react'
import type { FC } from 'react'
import styles from './StorageHeader.module.scss'
import type { IStorageHeader } from './interface/storage-header.interface'
import { SITE_NAME } from '@/constants/seo.constants'

const StorageHeader: FC<IStorageHeader> = ({ closeModal }) => {
	return (
		<div className={styles.header}>
			<div className={styles.box}>
				<div className={styles.icon}>
					<Folder />
				</div>
				<div className={styles.heading}>
					<span className={styles.supTitle}>{SITE_NAME}</span>
					<h3 className={styles.title}>Файловый менеджер</h3>
				</div>
			</div>
			<button type="button" className={styles.close} onClick={closeModal}>
				<X />
			</button>
		</div>
	)
}

export default StorageHeader
