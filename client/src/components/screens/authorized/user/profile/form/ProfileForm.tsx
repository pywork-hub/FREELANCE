'use client'

import AvatarUploadField from '@/components/ui/common/form/avatar-upload/AvatarUploadField'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import { LENGTH_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import { useUpdateProfile } from '@/hooks/user/profile/useUpdateProfile'
import type { IUserProfile } from '@/shared/interfaces/user/user.interface'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Profile.module.scss'

const ProfileForm: FC<IUserProfile> = ({ profile }) => {
	const { registerInput, control, errors, handleSubmit, onSubmit, loading } =
		useUpdateProfile(profile.login)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Controller
				name="avatarFile"
				control={control}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<AvatarUploadField
						className={styles.avatar}
						avatarPath={profile.avatarPath}
						onChange={onChange}
						loading={loading}
						value={value}
						error={error}
					/>
				)}
			/>
			<Field
				{...registerInput('login', LENGTH_VALIDATION('Логин', 5))}
				className={styles.field}
				placeholder="Логин"
				error={errors.login}
			/>
			<Button
				wrapperClassName={styles.updateWrapper}
				buttonClassName={styles.update}
			>
				Обновить
			</Button>
		</form>
	)
}

export default ProfileForm
