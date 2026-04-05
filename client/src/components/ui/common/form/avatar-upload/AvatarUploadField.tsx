import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { SITE_NAME } from '@/constants/seo.constants'
import cn from 'clsx'
import { Camera } from 'lucide-react'
import { useState, type FC } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import StaticImage from '../../image/StaticImage'
import globalStyles from '../Form.module.scss'
import styles from './AvatarUploadField.module.scss'
import type { IAvatarUpload } from './interface/avatar-upload.interface'

const AvatarUploadField: FC<IAvatarUpload> = ({
	loading,
	label,
	error,
	onChange,
	avatarPath,
	className,
}) => {
	const [file, setFile] = useState<File>()
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxSize: 5 * 1024 * 1024,
		maxFiles: 1,
		multiple: false,
		accept: {
			'image/jpeg': ['.jpeg', '.png'],
		},
		onDropRejected: (rejectedFiles) => {
			rejectedFiles.forEach((file) => {
				file.errors.forEach((error) => {
					toast.error(error.message)
				})
			})
		},
		onDropAccepted(files) {
			setFile(files[0])
			onChange && onChange(files[0])
		},
	})

	return (
		<div className={cn(globalStyles.field, className && className)}>
			{label && <label className={globalStyles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error.message}</span>}
			{loading ? (
				<div className={styles.box}>
					<MiniLoader />
				</div>
			) : (
				<div className={styles.box} {...getRootProps()}>
					<div
						className={cn(styles.fill, {
							[styles.dragged]: isDragActive,
						})}
					>
						<Camera />
					</div>
					<StaticImage
						className={styles.avatar}
						src={file ? URL.createObjectURL(file) : avatarPath}
						width={100}
						height={100}
						alt={SITE_NAME}
					/>
					<input {...getInputProps()} />
				</div>
			)}
		</div>
	)
}

export default AvatarUploadField
