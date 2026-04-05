import type { Dispatch, SetStateAction } from 'react'
import type { IClassName } from '../class-name/class-name.interface'

export interface IModal extends IClassName {
	closeModal: () => void
	heading: string
	size?: 'xl' | 'lg' | 'md' | 'sm'
}

export interface IModalState {
	setIsShow: Dispatch<SetStateAction<boolean>>
}
