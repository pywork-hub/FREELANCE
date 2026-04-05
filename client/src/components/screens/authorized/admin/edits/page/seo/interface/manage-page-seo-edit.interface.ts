import type { PageInput } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import type {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormResetField,
} from 'react-hook-form'

export interface IManagePageSeoEdit {
	registerInput: UseFormRegister<PageInput>
	resetField: UseFormResetField<PageInput>
	control: Control<PageInput, any>
	errors: FieldErrors<PageInput>
	isShow: {
		seo: boolean
		graphs: boolean
		block: boolean
	}
	setIsShow: Dispatch<
		SetStateAction<{
			seo: boolean
			graphs: boolean
			block: boolean
		}>
	>
}
