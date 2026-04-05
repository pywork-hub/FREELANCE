import type { InputHTMLAttributes } from 'react'

export type TypeNumberField = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	placeholder?: string
	error?: string
}
