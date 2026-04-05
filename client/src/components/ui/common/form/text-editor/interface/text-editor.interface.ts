import type { IFieldProps } from '../../interface/form.interface'

export interface ITextEditor extends Omit<IFieldProps, 'editorState'> {
	onChange: (...event: any[]) => void
	value?: string | null
}
