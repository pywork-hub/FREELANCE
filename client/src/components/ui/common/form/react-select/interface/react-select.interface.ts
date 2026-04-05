import type { ControllerRenderProps } from 'react-hook-form'
import type { Options } from 'react-select'
import type { IFieldProps } from '../../interface/form.interface'

export interface IReactSelectValue {
	value: number
	name: string
}

export interface IOption {
	label: string
	value: string | number
}

export interface IReactSelect extends IFieldProps {
	
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	isSearchable?: boolean
	isCreatable?: boolean
	isClearable?: boolean
	isMenuFixed?: boolean
}
