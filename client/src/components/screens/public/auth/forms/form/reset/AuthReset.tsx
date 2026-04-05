'use client'

import Container from '@/components/ui/common/container/Container'
import Field from '@/components/ui/common/form/field/Field'
import { LENGTH_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Section from '@/components/ui/common/section/Section'
import { useJwtAuthReset } from '@/hooks/public/auth/jwt/useJwtReset'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { FC } from 'react'
import styles from '../../Auth.module.scss'

const AuthReset: FC<IPageSearchParam> = ({ searchParams }) => {
	const { registerInput, handleSubmit, onSubmit, errors, loading } =
		useJwtAuthReset(String(searchParams?.token ? searchParams.token : ''))

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.fill}>
						<h1 className={styles.heading}>Сбросить пароль</h1>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
							<Field
								{...registerInput(
									'newPassword',
									LENGTH_VALIDATION('Новый пароль', 6)
								)}
								className={styles.field}
								type="password"
								placeholder="Новый пароль"
								error={errors.newPassword}
							/>
							<button className={styles.submit} disabled={loading}>
								Подтвердить
							</button>
						</form>
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default AuthReset
