import { OrderStatus } from '@/__generated__/output'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Modal from '@/components/ui/templates/modal/Modal'
import type { IOrder } from '@/shared/interfaces/order/order.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { ORDER_STATUS_TRANSLATE } from '@/translates/order/order-status.translate'
import { orderCreatedFormat } from '@/utils/formats/order/order-created-format.util'
import cn from 'clsx'
import { useEffect, useState, type FC } from 'react'
import styles from './Order.module.scss'
import OrderActions from './actions/OrderActions'
import OrderTimer from './timer/OrderTimer'

const Order: FC<IOrder & TypeExistUser> = ({
	order,
	setOrders,
	isNotUser,
	user,
}) => {
	const [isShow, setIsShow] = useState(false)
	const [isHydrated, setIsHydrated] = useState(false)
	const [timer, setTimer] = useState({
		term: order.term + 1,
		startTime: new Date(order.termUpdatedAt),
	})
	const { formattedCreatedDate, formattedCreatedTime } = orderCreatedFormat(
		order.createdAt
	)

	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<>
			<li className={styles.order} onClick={() => setIsShow(true)}>
				<button className={styles.opener}>
					{isNotUser && (
						<OrderActions
							setTimer={setTimer}
							order={order}
							setOrders={setOrders}
							isNotUser={isNotUser}
							user={user}
						/>
					)}
					<span className={styles.number}>{order.id}</span>
					<h3 className={styles.name}>{order.name}</h3>
					<div className={styles.partner}>
						<StaticImage
							src={order.partner.avatarPath}
							width={32}
							height={32}
							alt={order.partner.login}
						/>
						<h4 className={styles.partnerLogin}>{order.partner.login}</h4>
					</div>
					<span className={styles.price}>{order.total} ₽</span>
					<div
						className={cn(styles.orderStatus, {
							[styles.blue]: order.status === OrderStatus.InProcess,
							[styles.green]: order.status === OrderStatus.Completed,
							[styles.orange]: order.status === OrderStatus.Expired,
							[styles.red]: order.status === OrderStatus.Canceled,
							[styles.pink]: order.status === OrderStatus.Refunded,
						})}
					>
						<span>{ORDER_STATUS_TRANSLATE[order.status]}</span>
					</div>
					<div className={styles.created}>
						<div>
							<span>{formattedCreatedDate}</span>
							<span>{formattedCreatedTime}</span>
						</div>
					</div>
					<div className={styles.term}>
						{isHydrated && order.status === OrderStatus.InProcess && (
							<OrderTimer startTime={timer.startTime} term={timer.term} />
						)}
					</div>
				</button>
			</li>
			{isShow && (
				<Modal heading="Описание" closeModal={() => setIsShow(false)}>
					<div
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: order.description }}
					/>
				</Modal>
			)}
		</>
	)
}

export default Order
