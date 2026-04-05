import Field from '@/components/ui/common/form/field/Field'
import {
	EMAIL_VALIDATION,
	LENGTH_VALIDATION,
} from '@/components/ui/common/form/validation/form.validation'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { useJwtAuthConfirmation } from '@/hooks/public/auth/jwt/useJwtConfirmation'
import { useAuthConfirmationStore } from '@/store/timer/timer.store'
import { timerFormat } from '@/utils/formats/timer/timer-format.util'
import type { FC } from 'react'
import styles from '../../Auth.module.scss'

const AuthRegister: FC = () => {
	const { registerInput, handleSubmit, onSubmit, errors, loading } =
		useJwtAuthConfirmation()
	const { remainingTime } = useAuthConfirmationStore()

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Field
				{...registerInput('email', EMAIL_VALIDATION())}
				className={styles.field}
				placeholder="E-mail"
				error={errors.email}
			/>
			<Field
				{...registerInput('login', LENGTH_VALIDATION('Логин', 5))}
				className={styles.field}
				placeholder="Логин"
				error={errors.login}
			/>
			<Field
				{...registerInput('password', LENGTH_VALIDATION('Пароль', 6))}
				type="password"
				className={styles.password}
				placeholder="Пароль"
				error={errors.password}
			/>
			{loading ? (
				<MiniLoader className={styles.loader} />
			) : remainingTime ? (
				<div className={styles.submit}>{timerFormat(remainingTime)}</div>
			) : (
				<button className={styles.submit}>Зарегистрироваться</button>
			)}
		</form>
	)
}

export default AuthRegister
