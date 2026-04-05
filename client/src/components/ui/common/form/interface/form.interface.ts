import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { FieldError } from 'react-hook-form'

export interface IFieldProps extends IClassName {
	label?: string
	placeholder?: string
	error?: FieldError | undefined
}
