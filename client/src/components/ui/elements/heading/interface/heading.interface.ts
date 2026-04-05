import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'

export interface IHeading extends IClassName{
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}