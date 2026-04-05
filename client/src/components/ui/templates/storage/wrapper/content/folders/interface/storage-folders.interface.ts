import type { Folder } from '@/__generated__/output'

export interface IStorageFolders {
	folders: Folder[]
	goTo: (folderPath: string) => void
}
