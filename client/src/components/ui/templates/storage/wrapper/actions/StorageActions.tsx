import { FolderUp, UploadCloud } from 'lucide-react'
import { useState, type FC } from 'react'
import Modal from '../../../modal/Modal'
import styles from './StorageActions.module.scss'
import StorageCreateFolder from './createFolder/StorageCreateFolder'
import type {
	IStorageActions,
	TypeStorageActions,
} from './interface/storage-actions.interface'
import StorageUpload from './upload/StorageUpload'

const StorageActions: FC<IStorageActions> = ({ folderPath }) => {
	const [isShow, setIsShow] = useState(false)
	const [type, setType] = useState<TypeStorageActions>('file')

	return (
		<div className={styles.actions}>
			<button
				type="button"
				className={styles.button}
				onClick={() => {
					setType('file')
					setIsShow(true)
				}}
			>
				<UploadCloud />
				Загрузить файлы
			</button>
			<button
				type="button"
				className={styles.button}
				onClick={() => {
					setType('folder')
					setIsShow(true)
				}}
			>
				<FolderUp />
				Создать папку
			</button>
			{isShow && (
				<Modal heading={type === 'file' ? 'Загрузка файлов' : 'Создать папку'} closeModal={() => setIsShow(false)} size='lg'>
					{type === 'file' ? (
						<StorageUpload setIsShow={setIsShow} folderPath={folderPath} />
					) : (
						<StorageCreateFolder
							setIsShow={setIsShow}
							folderPath={folderPath}
						/>
					)}
				</Modal>
			)}
		</div>
	)
}

export default StorageActions
