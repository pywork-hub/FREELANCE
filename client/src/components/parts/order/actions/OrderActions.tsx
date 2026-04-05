import { OrderStatus } from '@/__generated__/output'
import Button from '@/components/ui/common/form/button/Button'
import TermField from '@/components/ui/common/form/term-field/TermField'
import Modal from '@/components/ui/templates/modal/Modal'
import { useOrderAction } from '@/hooks/user/orders/useOrderAction'
import type { IOrderActions } from '@/shared/interfaces/order/order.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import cn from 'clsx'
import { Coins, PackageCheck, PackageSearch, PackageX } from 'lucide-react'
import { useState, type FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Order.module.scss'

const OrderActions: FC<IOrderActions & TypeExistUser> = ({
	order,
	setOrders,
	setTimer,
	isNotUser,
	user,
}) => {
	const [state, setState] = useState({
		isShow: false,
		action: () => {},
		type: 'inProcess',
	})

	const [userId, managerId] = isNotUser
		? [order.partner.userId, user.id]
		: [user.id, order.partner.userId]

	const {
		cancelOrder,
		completeOrder,
		refundOrder,
		control,
		errors,
		handleSubmit,
		onSubmitInProcess,
	} = useOrderAction(order.id, managerId, userId, setOrders, setTimer, setState)

	return (
		<>
			<div className={styles.actions}>
				{order.status === OrderStatus.Expired ||
				order.status === OrderStatus.Refunded ? (
					<span>Нет действии</span>
				) : (
					<>
						{order.status !== OrderStatus.Canceled && (
							<button
								className={cn(styles.action, styles.cancel)}
								onClick={() =>
									setState({
										isShow: true,
										action: () => {
											cancelOrder()
											setState((prev) => ({
												...prev,
												isShow: false,
											}))
										},
										type: 'cancel',
									})
								}
							>
								<PackageX />
							</button>
						)}
						{order.status !== OrderStatus.Completed && (
							<button
								className={cn(styles.action, styles.complete)}
								onClick={() => {
									setState({
										isShow: true,
										action: () => {
											completeOrder()
											setState((prev) => ({
												...prev,
												isShow: false,
											}))
										},
										type: 'complete',
									})
								}}
							>
								<PackageCheck />
							</button>
						)}
						{order.status !== OrderStatus.InProcess && (
							<button
								className={cn(styles.action, styles.inProcess)}
								onClick={() =>
									setState({
										isShow: true,
										action: () => {},
										type: 'inProcess',
									})
								}
							>
								<PackageSearch />
							</button>
						)}
						<button
							className={cn(styles.action, styles.refund)}
							onClick={() =>
								setState({
									isShow: true,
									action: () => {
										refundOrder()
										setState((prev) => ({
											...prev,
											isShow: false,
										}))
									},
									type: 'refund',
								})
							}
						>
							<Coins />
						</button>
					</>
				)}
			</div>
			{state.isShow && (
				<Modal
					closeModal={() =>
						setState((prev) => ({
							...prev,
							isShow: false,
						}))
					}
					heading={state.type === 'inProcess' ? 'Введите срок' : 'Вы уверены?'}
				>
					{state.type === 'inProcess' ? (
						<form
							onSubmit={handleSubmit(onSubmitInProcess)}
							className={styles.form}
						>
							<Controller
								name="term"
								control={control}
								render={({ field: { value, onChange } }) => (
									<TermField
										onChange={onChange}
										value={value || 86400}
										className={styles.field}
										error={errors.term}
									/>
								)}
							/>
							<Button
								wrapperClassName={styles.submitWrapper}
								buttonClassName={styles.submit}
							>
								Обновить статус
							</Button>
						</form>
					) : (
						<>
							<div className={styles.buttons}>
								<button className={styles.yes} onClick={state.action}>
									Да
								</button>
								<button
									className={styles.no}
									onClick={() =>
										setState((prev) => ({
											...prev,
											isShow: false,
										}))
									}
								>
									Нет
								</button>
							</div>
						</>
					)}
				</Modal>
			)}
		</>
	)
}

export default OrderActions
