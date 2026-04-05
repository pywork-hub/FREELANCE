import type { Dispatch, SetStateAction } from 'react'

export interface IStorageActions {
	folderPath: string
}

export interface IStorageActionsItem extends IStorageActions {
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export type TypeStorageActions = 'file' | 'folder'
