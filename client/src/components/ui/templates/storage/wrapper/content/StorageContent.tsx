'use client'

import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'
import styles from './StorageContent.module.scss'
import StorageFiles from './files/StorageFiles'
import StorageFolders from './folders/StorageFolders'
import type { IStorageContent } from './interface/storage-content.interface'

const StorageContent: FC<IStorageContent> = ({
	pickedFiles,
	folderPath,
	data,
	goTo,
	previous,
	isFirst,
	onFileSelect,
}) => {
	const response = data?.folderItems

	return (
		<div className={styles.content}>
			<div className={styles.source}>
				{!isFirst && (
					<button type="button" className={styles.prev} onClick={previous}>
						<ArrowLeft />
						Назад
					</button>
				)}
				<div className={styles.path}>
					<h3 className={styles.pathTitle}>Текущая директория -</h3>
					<span>{folderPath}</span>
				</div>
			</div>
			{response && response.folders?.length > 0 && (
				<div className={styles.access}>
					<h3 className={styles.title}>Папки</h3>
					<StorageFolders folders={response.folders || []} goTo={goTo} />
				</div>
			)}
			{response && response.files?.length > 0 && (
				<div className={styles.recent}>
					<h3 className={styles.title}>Файлы</h3>
					<StorageFiles
						pickedFiles={pickedFiles}
						files={response.files || []}
						onFileSelect={onFileSelect}
					/>
				</div>
			)}
		</div>
	)
}

export default StorageContent
