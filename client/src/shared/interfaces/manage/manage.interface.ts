import { Visibility } from '@/__generated__/output'

export interface IManageItem {
	deleteHandler?: () => void
	toggleHandler?: () => void
	duplicateHandler?: () => void
}

export interface IManageActions extends IManageItem {
	editUrl?: string
	childrensUrl?: string
	visibility?: Visibility
}
