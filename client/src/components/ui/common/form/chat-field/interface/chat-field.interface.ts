import type { TextareaHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

export type TypeChatField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps & {
		onChange: (...event: any[]) => void
		value: string
	}
