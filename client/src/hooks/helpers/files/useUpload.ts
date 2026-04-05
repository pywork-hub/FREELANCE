import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const useUpload = () => {
	const [files, setFiles] = useState<File[]>([])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
		},
	})

	const deleteFile = (index: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
	}

	return { files, getRootProps, getInputProps, isDragActive, deleteFile }
}
