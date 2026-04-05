import type { File } from '@/__generated__/output'

export interface IStorageFiles {
	onFileSelect: (fileUrl: string) => void
	files: File[]
	pickedFiles: string[]
}
