import type { InputHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

export type TypeTextarea = InputHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps & {
		onChange: (...event: any[]) => void
		value?: string
	}
