'use client'

import cn from 'clsx'
import { type FC } from 'react'
import styles from './ToggleSwitch.module.scss'
import type { TypeToggleSwitch } from './interface/toggle-switch.interface'

const ToggleSwitch: FC<TypeToggleSwitch> = ({
	className,
	isVisible,
	onChange,
}) => {
	return (
		<div className={cn(styles.wrapper, className && className)}>
			<label
				className={cn(styles.switch, {
					[styles.checked]: isVisible,
				})}
			>
				<input
					type="checkbox"
					checked={isVisible}
					onChange={onChange}
					className={styles.input}
				/>
				<span className={cn(styles.slider, styles.round)}></span>
			</label>
		</div>
	)
}

export default ToggleSwitch
