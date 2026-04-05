import type { ButtonHTMLAttributes } from 'react'

interface IButtonClassName {
	wrapperClassName?: string
	buttonClassName?: string
}

export type TypeButton = ButtonHTMLAttributes<HTMLButtonElement> &
	IButtonClassName
