import { MessageStatus, MessageType } from '@/__generated__/output'
import ChatField from '@/components/ui/common/form/chat-field/ChatField'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import Modal from '@/components/ui/templates/modal/Modal'
import { useReviewMessage } from '@/hooks/helpers/message/useReviewMessage'
import { useMessageAction } from '@/hooks/user/room/useMessageAction'
import type { IMessage } from '@/shared/interfaces/message/message.interface'
import type { IRoomId } from '@/shared/interfaces/room/room.interface'
import { timeFormat } from '@/utils/formats/date/time-format.util'
import { chatTextFormat } from '@/utils/formats/text/text-format.util'
import cn from 'clsx'
import { CheckCheck, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState, type FC } from 'react'
import { Controller } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import styles from './Message.module.scss'
import MessageForm from './form/MessageForm'

const Message: FC<IMessage & IRoomId> = ({
	message,
	roomId,
	user,
	setUnCheckedMessages,
}) => {
	const [isEditActive, setIsEditActive] = useState(false)
	const { control, handleSubmit, reset, onSubmit, deleteMessage, setValue } =
		useMessageAction(roomId, setIsEditActive)

	const contentRef = useRef<HTMLDivElement>(null)

	const { isShow, closeModal, serviceId } = useReviewMessage(user, contentRef)

	const { ref, inView } = useInView({
		triggerOnce: true,
	})

	const isSenderCurrentUser =
		message.sender.profile.login === user.profile.login
	const isDeleted = message.status === MessageStatus.Deleted

	useEffect(() => {
		if (!isSenderCurrentUser && !message.isChecked && inView && !isDeleted) {
			setUnCheckedMessages((prev) => [...prev, message.id])
		}
	}, [inView, isSenderCurrentUser, message, setUnCheckedMessages])

	return (
		<>
			<div className={styles.message} ref={ref}>
				<StaticImage
					className={styles.avatar}
					src={message.sender.profile.avatarPath}
					width={36}
					height={36}
					alt={message.sender.profile.login}
				/>
				<div className={styles.fill}>
					<div className={styles.info}>
						<h4 className={styles.login}>{message.sender.profile.login}</h4>
						<div className={styles.box}>
							{isSenderCurrentUser &&
								!isDeleted &&
								!isEditActive &&
								(message.type === MessageType.Message ||
									message.type === MessageType.Offer) && (
									<div className={styles.toggle}>
										<div className={styles.ellipsis}>
											<span></span>
											<span></span>
											<span></span>
										</div>
										<Dropdown className={styles.dropdown}>
											<div className={styles.actions}>
												{message.type !== MessageType.Offer && (
													<button
														className={styles.change}
														onClick={() => {
															setValue('content', message.content)
															setValue('messageId', message.id)
															setIsEditActive(true)
														}}
													>
														<Pencil />
													</button>
												)}
												<button
													className={styles.delete}
													onClick={() => deleteMessage(message.id)}
												>
													<Trash2 />
												</button>
											</div>
										</Dropdown>
									</div>
								)}
							<div className={styles.terms}>
								{isSenderCurrentUser && !isDeleted && (
									<CheckCheck
										className={cn(styles.check, {
											[styles.checked]: message.isChecked,
										})}
									/>
								)}
								<span className={styles.time}>
									{timeFormat(message.createdAt)}
								</span>
							</div>
						</div>
					</div>
					{!isEditActive ? (
						<>
							<div
								ref={contentRef}
								className={cn(styles.content, {
									[styles.deleted]: isDeleted,
								})}
								dangerouslySetInnerHTML={{
									__html: isDeleted
										? 'Сообщение удалено'
										: chatTextFormat(message.content),
								}}
							/>
							{message.status === MessageStatus.Edited && (
								<span className={styles.edited}>
									Изменено ({timeFormat(message.updatedAt)})
								</span>
							)}
						</>
					) : (
						<div className={styles.edit}>
							<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
								<Controller
									name="content"
									control={control}
									render={({ field: { value, onChange } }) => (
										<ChatField
											className={styles.field}
											placeholder="Введите сообщение"
											onChange={onChange}
											value={value as string}
											rows={1}
											autoFocus
										/>
									)}
								/>
								<div className={styles.buttons}>
									<button type="submit" className={styles.save}>
										Сохранить
									</button>
									<button
										type="button"
										onClick={() => {
											reset()
											setIsEditActive(false)
										}}
										className={styles.cancel}
									>
										Отменить
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
			{isShow && serviceId && (
				<Modal heading="Оставить отзыв" closeModal={closeModal} size="lg">
					<MessageForm
						serviceId={+serviceId}
						roomId={roomId}
						closeModal={closeModal}
					/>
				</Modal>
			)}
		</>
	)
}

export default Message
