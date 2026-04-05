'use client'

import StaticImage from '@/components/ui/common/image/StaticImage'
import { useUpload } from '@/hooks/helpers/files/useUpload'
import { useStorageActions } from '@/hooks/manage/storage/useStorageActions'
import { formatBytes } from '@/utils/formats/storage/format-bytes.util'
import { formatExtension } from '@/utils/formats/storage/format-extension.util'
import cn from 'clsx'
import { Trash2 } from 'lucide-react'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import { STORAGE_MIME_TYPES } from '../../content/files/mime-types/mime-type.data'
import type { IStorageActionsItem } from '../interface/storage-actions.interface'
import styles from './StorageUpload.module.scss'

const StorageUpload: FC<IStorageActionsItem> = ({ setIsShow, folderPath }) => {
	const { files, getInputProps, getRootProps, isDragActive, deleteFile } =
		useUpload()
	const { uploadFiles } = useStorageActions('file')

	return (
		<div className={styles.upload}>
			<div
				className={cn(styles.box, {
					[styles.dragged]: isDragActive,
				})}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<p className={styles.text}>
					<span>Перетащите</span> файлы сюда
				</p>
			</div>
			{files.length > 0 && (
				<>
					<div className={styles.uploaded}>
						<h3 className={styles.subtitle}>Выбранные файлы</h3>
						<ul className={styles.files}>
							{files.map((file, index) => (
								<li key={index} className={styles.file}>
									<div className={styles.fileFill}>
										<StaticImage
											width={30}
											height={40}
											src={
												STORAGE_MIME_TYPES[formatExtension(file.name)] ||
												STORAGE_MIME_TYPES['default']
											}
											alt={file.name}
										/>
										<div className={styles.fileInfo}>
											<h4 className={styles.fileName}>{file.name}</h4>
											<span className={styles.fileSize}>
												{formatBytes(file.size)}
											</span>
										</div>
									</div>
									<button
										type="button"
										className={styles.delete}
										onClick={() => deleteFile(index)}
									>
										<Trash2 />
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.buttons}>
						<button
							type="button"
							className={styles.close}
							onClick={() => setIsShow(false)}
						>
							Отмена
						</button>
						<button
							type="button"
							className={styles.add}
							onClick={() => {
								uploadFiles({
									variables: {
										data: {
											data: files,
											folderPath,
										},
									},
									onCompleted: () => {
										setIsShow(false)
										toast.success('Файлы загружены.')
									},
									onError: (error) => {
										toast.error('Ошибка во время загрузки файлов.')
									},
								})
							}}
							disabled={files.length === 0}
						>
							Загрузить
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default StorageUpload
