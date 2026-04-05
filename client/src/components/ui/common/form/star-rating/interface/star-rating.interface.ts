import type { ButtonHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

export type TypeStarRating = ButtonHTMLAttributes<HTMLButtonElement> &
	IFieldProps & {
		onChange: (...event: any[]) => void
		value: number
	}
