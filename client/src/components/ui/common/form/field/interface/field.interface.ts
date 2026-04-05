import type { InputHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

export type TypeField = InputHTMLAttributes<HTMLInputElement> &
	IFieldProps & {
		stylize?: 'default' | 'custom'
		onChange: (...event: any[]) => void
	}
