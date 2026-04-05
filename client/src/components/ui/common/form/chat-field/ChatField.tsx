import {
	fromTextFullFormat,
	textFullFormat,
} from '@/utils/formats/text/text-format.util'
import cn from 'clsx'
import { forwardRef, useEffect, useRef, type ChangeEvent } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './ChatField.module.scss'
import type { TypeChatField } from './interface/chat-field.interface'

const ChatField = forwardRef<HTMLTextAreaElement, TypeChatField>(
	({ className, value, onChange, error, ...rest }, ref) => {
		const fieldRef = useRef<HTMLTextAreaElement | null>(null)

		useEffect(() => {
			if (fieldRef.current) {
				const text = fieldRef.current.value
				fieldRef.current.style.height = `${
					!text ? '100%' : fieldRef.current.scrollHeight + 'px'
				}`
			}
		}, [value])

		const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
			const text = e.target.value
			onChange({ target: { value: textFullFormat(text) } })
		}

		return (
			<div className={cn(styles.field, className && className)}>
				{error && <span className={globalStyles.error}>{error.message}</span>}
				<textarea
					className={styles.textarea}
					ref={(instance) => {
						fieldRef.current = instance
						if (typeof ref === 'function') {
							ref(instance)
						} else if (ref) {
							;(
								ref as React.MutableRefObject<HTMLTextAreaElement | null>
							).current = instance
						}
					}}
					value={fromTextFullFormat(value)}
					onChange={handleInput}
					{...rest}
				/>
			</div>
		)
	}
)

export default ChatField
