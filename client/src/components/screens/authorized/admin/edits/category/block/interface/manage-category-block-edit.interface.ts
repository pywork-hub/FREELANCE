import type { CategoryInput } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import type {
	Control,
	FieldErrors,
	UseFieldArrayReturn,
	UseFormRegister,
	UseFormResetField,
} from 'react-hook-form'

export interface IManageCategoryBlockEdit {
	blockItems: UseFieldArrayReturn<CategoryInput, 'block.items', 'id'>
	registerInput: UseFormRegister<CategoryInput>
	resetField: UseFormResetField<CategoryInput>
	control: Control<CategoryInput, any>
	errors: FieldErrors<CategoryInput>
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
