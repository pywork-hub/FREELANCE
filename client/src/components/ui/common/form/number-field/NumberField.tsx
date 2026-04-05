import cn from 'clsx'
import { type FC } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './NumberField.module.scss'
import type { TypeNumberField } from './interface/number-field.interface'

const NumberField: FC<TypeNumberField> = ({
	className,
	label,
	error,
	type = 'text',
	...rest
}) => {
	return (
		<div className={cn(globalStyles.field, className && className)}>
			{label && <label className={styles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error}</span>}
			<input className={styles.input} type={type} {...rest} />
		</div>
	)
}

export default NumberField
