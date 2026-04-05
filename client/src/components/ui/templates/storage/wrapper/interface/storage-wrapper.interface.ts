export interface IStorageWrapper {
	pickedFiles: string[]
	onFileSelect: (fileUrl: string) => void
}
