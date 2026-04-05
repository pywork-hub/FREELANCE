import type { ServiceInput } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import type {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormResetField,
} from 'react-hook-form'

export interface IManageServiceSeoEdit {
	registerInput: UseFormRegister<ServiceInput>
	resetField: UseFormResetField<ServiceInput>
	control: Control<ServiceInput, any>
	errors: FieldErrors<ServiceInput>
	isShow: {
		seo: boolean
		graphs: boolean
	}
	setIsShow: Dispatch<
		SetStateAction<{
			seo: boolean
			graphs: boolean
		}>
	>
}
