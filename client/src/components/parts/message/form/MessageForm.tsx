import Button from '@/components/ui/common/form/button/Button'
import StarRating from '@/components/ui/common/form/star-rating/StarRating'
import Textarea from '@/components/ui/common/form/textarea/Textarea'
import {
	LENGTH_VALIDATION,
	REQUIRED_VALIDATION,
} from '@/components/ui/common/form/validation/form.validation'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { useLeftReview } from '@/hooks/user/review/useLeftReview'
import type { IMessageForm } from '@/shared/interfaces/message/message.interface'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Message.module.scss'

const MessageForm: FC<IMessageForm> = ({
	serviceId,
	roomId,
	closeModal,
}) => {
	const { control, onSubmit, errors, handleSubmit, loading } = useLeftReview(
		serviceId,
		roomId,
		closeModal
	)

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="rating"
				control={control}
				render={({ field: { value, onChange } }) => (
					<StarRating
						className={styles.rating}
						label="Оценка"
						onChange={onChange}
						value={value}
						error={errors.rating}
					/>
				)}
				rules={REQUIRED_VALIDATION('Оценка')}
			/>
			<Controller
				name="comment"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Textarea
						className={styles.textarea}
						placeholder="Введите комментарий..."
						label="Комментарий"
						onChange={(e) => onChange(e)}
						value={value as string}
						error={errors.comment}
					/>
				)}
				rules={LENGTH_VALIDATION('Комментарий', 20)}
			/>
			{loading ? (
				<div className={styles.loader}>
					<MiniLoader />
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

export default MessageForm
