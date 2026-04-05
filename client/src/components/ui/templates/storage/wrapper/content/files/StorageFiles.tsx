import StaticImage from '@/components/ui/common/image/StaticImage'
import { useStorageActions } from '@/hooks/manage/storage/useStorageActions'
import { dateFormat } from '@/utils/formats/date/date-format.util'
import { Check, X } from 'lucide-react'
import type { FC } from 'react'
import styles from './StorageFiles.module.scss'
import type { IStorageFiles } from './interface/storage-files.interface'
import { STORAGE_MIME_TYPES } from './mime-types/mime-type.data'

const StorageFiles: FC<IStorageFiles> = ({
	files,
	pickedFiles,
	onFileSelect,
}) => {
	const { deleteFileOrFolder } = useStorageActions('file')

	return (
		<ul className={styles.files}>
			{files.map((file, index) => (
				<li key={index} className={styles.file}>
					{pickedFiles.includes(`/${file.path}`) && (
						<span className={styles.picked}>
							<Check />
						</span>
					)}
					<button
						type="button"
						className={styles.btn}
						onClick={() => onFileSelect(`/${file.path}`)}
					>
						<StaticImage
							width={30}
							height={40}
							src={
								STORAGE_MIME_TYPES[file.extension] ||
								STORAGE_MIME_TYPES['default']
							}
							alt={file.name}
						/>
						<span>{file.name}</span>
						<div className={styles.info}>
							<span>{dateFormat(file.createdAt)}</span>
							<span>{file.size}</span>
						</div>
					</button>
					<button
						type="button"
						className={styles.remove}
						onClick={() => {
							deleteFileOrFolder({
								variables: {
									path: file.path,
								},
							})
						}}
					>
						<X />
					</button>
				</li>
			))}
		</ul>
	)
}

export default StorageFiles
