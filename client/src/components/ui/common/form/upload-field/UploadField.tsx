import Storage from '@/components/ui/templates/storage/Storage'
import cn from 'clsx'
import { Trash2 } from 'lucide-react'
import { useEffect, useState, type FC } from 'react'
import StaticImage from '../../image/StaticImage'
import globalStyles from '../Form.module.scss'
import styles from './UploadField.module.scss'
import type { IUploadField } from './interface/upload-field.interface'

const UploadField: FC<IUploadField> = ({
	label,
	placeholder = 'Выбрать Картинку',
	error,
	className,
	isNoImage = false,
	isMulti = false,
	onChange,
	value,
	uploadedClassName,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [files, setFiles] = useState<string[]>([])

	useEffect(() => {
		if (value) {
			setFiles(Array.isArray(value) ? value : [value])
		}
	}, [value])

	const removeFile = (fileUrl: string) => {
		setFiles(isMulti ? files.filter((file) => file !== fileUrl) : [])
		onChange(isMulti ? files.filter((file) => file !== fileUrl) : files[0])
	}

	const selectFile = (fileUrl: string) => {
		setFiles((prev) => {
			const updatedFiles = isMulti ? [...prev, fileUrl] : [fileUrl]
			onChange(isMulti ? updatedFiles : updatedFiles[0])
			return updatedFiles
		})
	}

	return (
		<div className={cn(styles.upload, className && className)}>
			<div className={styles.uploadWrapper}>
				<div className={globalStyles.field}>
					{label && <label className={globalStyles.label}>{label}</label>}
					{error && <span className={globalStyles.error}>{error.message}</span>}
					<button
						type="button"
						className={styles.uploadBtn}
						onClick={() => setIsOpen(!isOpen)}
					>
						{placeholder}
					</button>
				</div>
				{value && (
					<div
						className={cn(
							styles.uploadFill,
							uploadedClassName && uploadedClassName
						)}
					>
						{!isNoImage ? (
							files.map((file, index) => (
								<div className={styles.value} key={index}>
									<StaticImage
										src={file}
										width={0}
										height={0}
										sizes="100vw"
										alt="Manage image"
									/>
									<button
										type="button"
										className={styles.remove}
										onClick={() => removeFile(file)}
									>
										<Trash2 />
									</button>
								</div>
							))
						) : (
							<video className={styles.video}>
								<source src={files[0]} />
							</video>
						)}
					</div>
				)}
			</div>
			{isOpen && (
				<Storage
					pickedFiles={files}
					onFileSelect={selectFile}
					closeModal={() => setIsOpen(false)}
				/>
			)}
		</div>
	)
}

export default UploadField
