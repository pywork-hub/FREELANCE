import {
	GetFolderItemsDocument,
	useDeleteFileOrFolderMutation,
	useUploadFilesMutation,
} from '@/__generated__/output'
import toast from 'react-hot-toast'

export const useStorageActions = (type: 'folder' | 'file') => {
	const [deleteFileOrFolder] = useDeleteFileOrFolderMutation({
		refetchQueries: [GetFolderItemsDocument],
		onCompleted: () => {
			toast.success(type === 'folder' ? 'Папка удалена.' : 'Файл удален.')
		},
		onError: () => {
			toast.error(
				type === 'folder'
					? 'Ошибка во время удаления папки.'
					: 'Ошибка во время удаления файла.'
			)
		},
	})

	const [uploadFiles] = useUploadFilesMutation({
		refetchQueries: [GetFolderItemsDocument],
	})

	return {
		deleteFileOrFolder,
		uploadFiles,
	}
}
