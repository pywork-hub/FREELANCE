import cn from 'clsx'
import type { FC, PropsWithChildren } from 'react'
import styles from './Dropdown.module.scss'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'

const Dropdown: FC<PropsWithChildren<IClassName>> = ({
	className,
	children,
}) => {
	return (
		<div className={cn(styles.dropdown, className && className)}>
			{children}
		</div>
	)
}

export default Dropdown
