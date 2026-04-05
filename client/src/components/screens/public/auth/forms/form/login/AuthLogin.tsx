import Field from '@/components/ui/common/form/field/Field'
import { LENGTH_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import { useJwtAuthLogin } from '@/hooks/public/auth/jwt/useJwtAuthLogin'
import type { FC } from 'react'
import styles from '../../Auth.module.scss'

const AuthLogin: FC = () => {
	const { registerInput, handleSubmit, onSubmit, errors, loading } =
		useJwtAuthLogin()

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Field
				{...registerInput(
					'loginOrEmail',
					LENGTH_VALIDATION('Логин или E-mail', 5)
				)}
				className={styles.field}
				placeholder="Логин или E-mail"
				error={errors.loginOrEmail}
			/>
			<Field
				{...registerInput('password', LENGTH_VALIDATION('Пароль', 6))}
				type="password"
				className={styles.password}
				placeholder="Пароль"
				error={errors.password}
			/>
			<button className={styles.submit} disabled={loading}>
				Войти
			</button>
		</form>
	)
}

export default AuthLogin
