import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'

export interface IStorage extends IClassName {
	pickedFiles: string[]
	onFileSelect: (fileUrl: string) => void
	closeModal: () => void
}
