import type { InputHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

export type TypeTermField = InputHTMLAttributes<HTMLInputElement> &
	IFieldProps & {
		value: number
		onChange: (...event: any[]) => void
	}

export type TypeTermFieldVariant = 'days' | 'hours' | 'minutes' | 'seconds'