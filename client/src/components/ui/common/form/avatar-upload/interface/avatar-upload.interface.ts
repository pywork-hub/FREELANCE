import type { InputHTMLAttributes } from 'react'
import type { IFieldProps } from '../../interface/form.interface'

type TypeAvatarField = InputHTMLAttributes<HTMLInputElement> &
	Omit<IFieldProps, 'placeholder'> & {
		className?: string
		onChange: (...event: any[]) => void,
		avatarPath: string
	}

export interface IAvatarUpload extends TypeAvatarField {
	loading?: boolean
}
