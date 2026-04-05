import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { Dispatch, SetStateAction } from 'react'

export interface IQuantity extends IClassName {
	count: number
	setCount: Dispatch<SetStateAction<number>>
}
