import {
	fromTextFullFormat,
	textFullFormat,
} from '@/utils/formats/text/text-format.util'
import cn from 'clsx'
import { forwardRef, type ChangeEvent } from 'react'
import globalStyles from '../Form.module.scss'
import type { TypeTextarea } from './interface/textarea.interface'

const Textarea = forwardRef<HTMLTextAreaElement, TypeTextarea>(
	(
		{ className, label, error, type = 'text', value, onChange, ...rest },
		ref
	) => {
		const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
			const text = e.target.value
			onChange({ target: { value: textFullFormat(text) } })
		}

		return (
			<div className={cn(globalStyles.field, className && className)}>
				{label && <label className={globalStyles.label}>{label}</label>}
				{error && <span className={globalStyles.error}>{error.message}</span>}
				<textarea
					ref={ref}
					rows={1}
					className={globalStyles.input}
					value={fromTextFullFormat(value || '')}
					onChange={handleInput}
					{...rest}
				/>
			</div>
		)
	}
)

export default Textarea
