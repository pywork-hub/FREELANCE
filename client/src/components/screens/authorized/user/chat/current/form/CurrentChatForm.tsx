'use client'

import ChatField from '@/components/ui/common/form/chat-field/ChatField'
import { MAX_VALIDATION, MIN_VALIDATION, REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import TypingLoader from '@/components/ui/elements/loaders/typing/TypingLoader'
import { usePostMessage } from '@/hooks/user/room/usePostMessage'
import { useToggleTyping } from '@/hooks/user/room/useToggleTyping'
import { useUserTyping } from '@/hooks/user/room/useUserTyping'
import type { ICurrentRoom } from '@/shared/interfaces/room/room.interface'
import { Send } from 'lucide-react'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './CurrentChatForm.module.scss'

const CurrentChatForm: FC<ICurrentRoom> = ({ room }) => {
	const { isPartnerTyping } = useUserTyping(room.id, room.partner.id)
	const { isUserTyping, toggleTypingStart, toggleTypingStop } = useToggleTyping(
		room.id
	)
	const { handleSubmit, onSubmit, control, errors } = usePostMessage(
		room.id,
		toggleTypingStop
	)

	return (
		<div className={styles.wrapper}>
			{isPartnerTyping && (
				<div className={styles.typing}>
					<TypingLoader />
					<span>{room.partner.profile.login} печатает</span>
				</div>
			)}
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="content"
					defaultValue=""
					control={control}
					render={({ field: { value, onChange } }) => (
						<ChatField
							className={styles.field}
							placeholder="Введите сообщение"
							onChange={(e) => {
								onChange(e)
								!isUserTyping && toggleTypingStart()
								if (!e.target.value) {
									toggleTypingStop()
								}
							}}
							rows={1}
							error={errors.content}
							value={value as string}
						/>
					)}
					rules={MAX_VALIDATION(2)}
				/>
				<button className={styles.send}>
					<Send />
				</button>
			</form>
		</div>
	)
}

export default CurrentChatForm
