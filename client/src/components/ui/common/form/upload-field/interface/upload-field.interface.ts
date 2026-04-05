import type { FieldError } from 'react-hook-form'

export interface IUploadField {
	value?: string[] | string | null
	label?: string
	placeholder?: string
	error?: FieldError
	className?: string
	isNoImage?: boolean
	isMulti?: boolean
	onChange: (...event: any[]) => void
	uploadedClassName?: string
}
