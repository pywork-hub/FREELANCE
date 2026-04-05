import { secondsFormat } from '@/utils/formats/seconds/seconds-format.util'
import cn from 'clsx'
import { useEffect, useState, type ChangeEvent, type FC } from 'react'
import toast from 'react-hot-toast'
import globalStyles from '../Form.module.scss'
import styles from './TermField.module.scss'
import type {
	TypeTermField,
	TypeTermFieldVariant,
} from './interface/term-field.interface'

const TermField: FC<TypeTermField> = ({
	className,
	value,
	onChange,
	error,
}) => {
	const [values, setValues] = useState(secondsFormat(value))
	const [errors, setErrors] = useState({
		days: '',
		hours: '',
		minutes: '',
		seconds: '',
	})

	useEffect(() => {
		setValues(secondsFormat(value))
	}, [value])

	const validate = (variant: TypeTermFieldVariant, newValue: number) => {
		let errorMessage = ''

		if (variant === 'hours' && newValue > 23) {
			errorMessage = 'Максимум - 23'
		} else if (
			(variant === 'minutes' && newValue > 59) ||
			(variant === 'seconds' && newValue > 59)
		) {
			errorMessage = 'Максимум - 59'
		}

		return errorMessage
	}

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		variant: TypeTermFieldVariant
	) => {
		if (isNaN(+e.target.value)) return null

		const newValue = parseFloat(e.target.value) || 0
		const errorMessage = validate(variant, newValue)

		setErrors((prevErrors) => ({
			...prevErrors,
			[variant]: errorMessage,
		}))

		if (errorMessage) {
			return
		}

		setValues((prev) => {
			const updatedValues = {
				...prev,
				[variant]: newValue,
			}
			const term =
				updatedValues.days * 86400 +
				updatedValues.hours * 3600 +
				updatedValues.minutes * 60 +
				updatedValues.seconds

			if (term === 0) {
				toast.error('Минимальный срок должен быть больше 0 секунд.')
				return updatedValues
			}
			onChange(term)
			return updatedValues
		})
	}

	return (
		<div className={cn(globalStyles.field, className && className)}>
			{error && <p className={globalStyles.error}>{error.message}</p>}
			<div className={styles.wrapper}>
				<div className={globalStyles.field}>
					<label className={globalStyles.label}>Дней</label>
					<input
						type="number"
						onChange={(e) => handleChange(e, 'days')}
						value={values.days}
						min={0}
						className={cn(globalStyles.input, styles.input)}
					/>
				</div>
				<div className={globalStyles.field}>
					<label className={globalStyles.label}>Часов</label>
					{errors.hours && (
						<span className={globalStyles.error}>{errors.hours}</span>
					)}
					<input
						type="number"
						onChange={(e) => handleChange(e, 'hours')}
						value={values.hours}
						min={0}
						max={23}
						className={cn(globalStyles.input, styles.input)}
					/>
				</div>
				<div className={globalStyles.field}>
					<label className={globalStyles.label}>Минут</label>
					{errors.minutes && (
						<span className={globalStyles.error}>{errors.minutes}</span>
					)}
					<input
						type="number"
						onChange={(e) => handleChange(e, 'minutes')}
						value={values.minutes}
						min={0}
						max={59}
						className={cn(globalStyles.input, styles.input)}
					/>
				</div>
				<div className={globalStyles.field}>
					<label className={globalStyles.label}>Секунд</label>
					{errors.seconds && (
						<span className={globalStyles.error}>{errors.seconds}</span>
					)}
					<input
						type="number"
						onChange={(e) => handleChange(e, 'seconds')}
						value={values.seconds}
						min={0}
						max={59}
						className={cn(globalStyles.input, styles.input)}
					/>
				</div>
			</div>
		</div>
	)
}

export default TermField
