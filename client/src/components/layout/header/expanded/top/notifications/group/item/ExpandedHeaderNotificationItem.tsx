import { MessageStatus, MessageType } from '@/__generated__/output'
import StaticImage from '@/components/ui/common/image/StaticImage'
import { USER_PAGES } from '@/constants/url.constants'
import { useCheckMessages } from '@/hooks/user/room/useCheckMessages'
import type { INotificationMessage } from '@/shared/interfaces/message/message.interface'
import { useNotificationStore } from '@/store/notification/notification.store'
import { MESSAGE_TYPE_TRANSLATE } from '@/translates/message/message-type.translate'
import { dateFormat } from '@/utils/formats/date/date-format.util'
import { textFormat } from '@/utils/formats/text/text-format.util'
import cn from 'clsx'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import styles from '../../ExpandedHeaderNotifications.module.scss'

const ExpandedHeaderNotificationItem: FC<INotificationMessage> = ({
	message,
	isNotUser,
}) => {
	const { mutate } = useCheckMessages()
	const { checkMessages, checkMessageWithQuery } = useNotificationStore()
	const { push, refresh } = useRouter()

	return (
		<li className={styles.item}>
			<button
				className={styles.link}
				onClick={() => {
					push(USER_PAGES.CHAT(message.sender.profile.login))
					refresh()
				}}
			>
				<StaticImage
					className={styles.avatar}
					src={message.sender.profile.avatarPath}
					width={32}
					height={32}
					alt={message.sender.profile.login}
				/>
				<div className={styles.content}>
					<div className={styles.head}>
						<span className={styles.date}>{dateFormat(message.createdAt)}</span>
					</div>
					<div
						className={cn(styles.message, {
							[styles.green]:
								message.type === MessageType.Offer ||
								message.type === MessageType.OrderInProcess ||
								message.type === MessageType.OrderCompleted ||
								message.type === MessageType.ReviewOffered ||
								message.type === MessageType.ReviewLeft,
							[styles.red]: message.type === MessageType.OrderCanceled,
							[styles.orange]: message.type === MessageType.OrderExpired,
							[styles.pink]: message.type === MessageType.OrderRefunded,
							[styles.blue]:
								message.status === MessageStatus.Edited ||
								message.status === MessageStatus.Deleted,
						})}
						dangerouslySetInnerHTML={{
							__html: `${
								message.type === MessageType.Message || message.type === MessageType.Service
									? textFormat(message.content)
									: message.type === MessageType.ReviewOffered ||
									  message.type === MessageType.ReviewLeft ||
									  message.type === MessageType.Offer
									? `${MESSAGE_TYPE_TRANSLATE[message.type]}`
									: `${MESSAGE_TYPE_TRANSLATE[message.type]} - Номер: ${
											message.orderId
									  }`
							}`,
						}}
					/>
				</div>
			</button>
			<button
				className={styles.remove}
				onClick={() => {
					if (isNotUser && message.type !== MessageType.Message) {
						checkMessages([message.id])
					} else {
						mutate({
							variables: {
								messagesIds: [message.id],
								roomId: message.roomId,
							},
							onCompleted: ({ checkMessages }) => {
								checkMessageWithQuery(checkMessages)
							},
							onError: () => {
								toast.error('Ошибка во время удаления.')
							},
						})
					}
				}}
			>
				<Trash2 />
			</button>
		</li>
	)
}

export default ExpandedHeaderNotificationItem
