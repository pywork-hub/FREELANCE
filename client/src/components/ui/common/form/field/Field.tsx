'use client'

import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './Field.module.scss'
import type { TypeField } from './interface/field.interface'

const Field = forwardRef<HTMLInputElement, TypeField>(
	(
		{ className, label, error, type = 'text', stylize = 'default', ...rest },
		ref
	) => {
		const isPassword = type === 'password'
		const [isShow, setIsShow] = isPassword ? useState(false) : [false, () => {}]

		return (
			<div className={cn(globalStyles.field, className && className)}>
				{label && <label className={globalStyles.label}>{label}</label>}
				{error && <span className={globalStyles.error}>{error.message}</span>}
				{isPassword ? (
					<div className={styles.box}>
						<input
							ref={ref}
							type={isShow ? 'text' : 'password'}
							{...rest}
							className={
								stylize === 'default'
									? cn(styles.password, globalStyles.input)
									: ''
							}
						/>
						<button className={styles.show} onClick={() => setIsShow(!isShow)} type='button'>
							{isShow ? <EyeOff /> : <Eye />}
						</button>
					</div>
				) : (
					<input
						className={
							stylize === 'default' ? cn(styles.input, globalStyles.input) : ''
						}
						ref={ref}
						type={type}
						{...rest}
					/>
				)}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
