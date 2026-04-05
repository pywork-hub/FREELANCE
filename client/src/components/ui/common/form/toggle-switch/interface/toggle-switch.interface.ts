import type { IFieldProps } from '../../interface/form.interface'

export type TypeToggleSwitch = IFieldProps & {
	onChange?: () => void
	isVisible: boolean
}
