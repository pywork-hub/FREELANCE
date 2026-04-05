import type { PageInput } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import type {
	Control,
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
	UseFormResetField,
} from 'react-hook-form'

export interface IManagePageBlockEdit {
	blockItems: UseFieldArrayReturn<PageInput, 'block.items', 'id'>
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
