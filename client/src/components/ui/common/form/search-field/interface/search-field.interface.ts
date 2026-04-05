import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { ChangeEvent, InputHTMLAttributes } from 'react'

export interface ISearchFieldProps extends IClassName {
	hasButton?: boolean
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	label?: string
}

export type TypeSearchField = InputHTMLAttributes<HTMLInputElement> &
	ISearchFieldProps
