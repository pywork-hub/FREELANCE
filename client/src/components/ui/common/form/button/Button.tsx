import cn from 'clsx'
import type { FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss'
import type { TypeButton } from './interface/button.interface'

const Button: FC<PropsWithChildren<TypeButton>> = ({
	children,
	buttonClassName,
	wrapperClassName,
	...rest
}) => {
	return (
		<div className={cn(styles.field, wrapperClassName && wrapperClassName)}>
			<button
				className={cn(styles.button, buttonClassName && buttonClassName)}
				{...rest}
			>
				{children}
			</button>
		</div>
	)
}

export default Button
