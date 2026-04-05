'use client'

import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import Textarea from '@/components/ui/common/form/textarea/Textarea'
import {
	EMAIL_VALIDATION,
	LENGTH_VALIDATION,
	REQUIRED_VALIDATION,
} from '@/components/ui/common/form/validation/form.validation'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { useSendRequest } from '@/hooks/public/requests/useSendRequest'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import { useContactStore } from '@/store/timer/timer.store'
import { timerFormat } from '@/utils/formats/timer/timer-format.util'
import cn from 'clsx'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Contact.module.scss'

const ContactForm: FC<TypeIronUser> = ({ user }) => {
	const { registerInput, control, handleSubmit, onSubmit, errors, loading } =
		useSendRequest({
			user,
		})
	const { remainingTime } = useContactStore()

	const isNotAuthenticated = !user

	const className = isNotAuthenticated ? styles.third : styles.half

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Field
				{...registerInput('firstName', REQUIRED_VALIDATION('Имя'))}
				className={cn(styles.field, className)}
				placeholder="Введите ваше имя"
				label="Имя"
				error={errors.firstName}
			/>
			<Field
				{...registerInput('lastName', REQUIRED_VALIDATION('Фамилия'))}
				className={cn(styles.field, className)}
				placeholder="Введите вашу фамилию"
				label="Фамилия"
				error={errors.lastName}
			/>
			{isNotAuthenticated && (
				<Field
					{...registerInput('email', EMAIL_VALIDATION())}
					className={cn(styles.field, className)}
					placeholder="Введите ваш E-mail"
					label="E-mail"
					error={errors.email}
				/>
			)}
			<Controller
				name="message"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Textarea
						className={styles.textarea}
						placeholder="Введите сообщение..."
						label="Сообщение"
						onChange={(e) => onChange(e)}
						value={value as string}
						error={errors.message}
					/>
				)}
				rules={LENGTH_VALIDATION('Сообщение', 50)}
			/>
			{loading ? (
				<div className={styles.loader}>
					<MiniLoader />
				</div>
			) : remainingTime ? (
				<div className={styles.sendWrapper}>
					<div className={styles.send}>{timerFormat(remainingTime)}</div>
				</div>
			) : (
				<Button
					wrapperClassName={styles.sendWrapper}
					buttonClassName={styles.send}
				>
					Отправить
				</Button>
			)}
		</form>
	)
}

export default ContactForm
