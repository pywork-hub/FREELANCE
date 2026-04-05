import type { NewsletterInput } from '@/__generated__/output'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { UseFormSetValue } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useNewsletterFile = (
	setValue: UseFormSetValue<NewsletterInput>
) => {
	const [file, setFile] = useState<File | null>(null)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		maxSize: 60 * 1024 * 1024,
		multiple: false,
		accept: {
			'text/html': ['.html'],
		},
		onDrop: (acceptedFiles) => {
			setValue('file', acceptedFiles[0])
			setFile(acceptedFiles[0])
		},
		onDropRejected: (rejectedFiles) => {
			rejectedFiles.forEach((file) => {
				file.errors.forEach((error) => {
					toast.error(error.message)
				})
			})
		},
	})

	const deleteFile = () => {
		setValue('file', null)
		setFile(null)
	}

	return { file, getRootProps, getInputProps, isDragActive, deleteFile }
}
