import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'

export interface IGallery extends IClassName {
	isShow: boolean
	closeModal: () => void
	images: string[]
	activeSlider: number
}
