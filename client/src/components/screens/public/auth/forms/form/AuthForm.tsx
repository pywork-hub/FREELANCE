'use client'

import { useAuth } from '@/hooks/public/auth/useAuth'
import type { FC } from 'react'
import styles from '../Auth.module.scss'
import AuthLogin from './login/AuthLogin'
import AuthLost from './lost/AuthLost'
import AuthRegister from './register/AuthRegister'

const AuthForm: FC = () => {
	const { isLogin, isRegister, isLost, changeType } = useAuth()

	return (
		<>
			<h1 className={styles.heading}>
				{isRegister ? `Регистрация` : isLost ? 'Забыли пароль' : `Войти`}
			</h1>
			{isRegister ? <AuthRegister /> : isLost ? <AuthLost /> : <AuthLogin />}
			<div className={styles.change}>
				<div className={styles.line}>
					<span>{isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}</span>
				</div>
				<button
					className={styles.changeBtn}
					onClick={() => changeType(isLogin ? 'register' : 'login')}
				>
					{isLogin ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</div>
			{!isLost && (
				<div className={styles.lost}>
					<button className={styles.lostBtn} onClick={() => changeType('lost')}>
						Забыли пароль
					</button>
				</div>
			)}
		</>
	)
}

export default AuthForm
