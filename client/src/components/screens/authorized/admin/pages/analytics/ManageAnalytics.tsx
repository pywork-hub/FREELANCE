'use client'

import Table from '@/components/ui/elements/table/Table'
import ManageAnalyticsFilters from '@/components/ui/templates/manage/filters/analytics/ManageAnalyticsFilters'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useAnalyticsFilters } from '@/hooks/helpers/filters/useAnalyticsFilters'
import { useManageAnalytics } from '@/hooks/manage/pages/analytics/useManageAnalytics'
import cn from 'clsx'
import { Landmark, ShoppingBag, Trophy } from 'lucide-react'
import type { FC } from 'react'
import Card from '../../../../../ui/elements/card/Card'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageAnalytics.module.scss'
import Heading from '@/components/ui/elements/heading/Heading'

const ManageAnalytics: FC = () => {
	const { duration, updateQueryFilters } = useAnalyticsFilters()
	const {
		onlineUsersCount,
		offlineUsersCount,
		topPurchasers,
		popularServices,
		inProcessOrdersCount,
		completedOrdersCount,
		canceledOrdersCount,
		expiredOrdersCount,
		refundedOrdersCount,
		totalEarned,
	} = useManageAnalytics(duration)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar hasSearch={false} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>Аналитика</Heading>
				</div>
				<ManageAnalyticsFilters
					duration={duration}
					updateQueryFilters={updateQueryFilters}
				/>
				<div className={styles.fill}>
					<Card
						className={styles.card}
						label="Кол-во пользователей в сети"
						icon={<span className={styles.online}></span>}
						value={onlineUsersCount}
					/>
					<Card
						className={styles.card}
						label="Кол-во пользователей не в сети"
						icon={<span className={styles.offline}></span>}
						value={offlineUsersCount}
					/>
					<Card
						className={styles.card}
						label="Всего заработано"
						icon={<Landmark />}
						value={`${totalEarned} ₽`}
					/>
					<Card
						className={styles.card}
						label="Кол-во заказов в работе"
						icon={<span className={styles.inProcess}>В работе</span>}
						value={inProcessOrdersCount}
					/>
					<Card
						className={styles.card}
						label="Кол-во завершённых заказов"
						icon={<span className={styles.completed}>Завершен</span>}
						value={completedOrdersCount}
					/>
					<Card
						className={styles.card}
						label="Кол-во отменённых заказов"
						icon={<span className={styles.canceled}>Отменен</span>}
						value={canceledOrdersCount}
					/>
					<Card
						className={styles.card}
						label="Кол-во истекших заказов"
						icon={<span className={styles.expired}>Истек</span>}
						value={expiredOrdersCount}
					/>
					<Card
						className={styles.card}
						label="Кол-во возвращенных заказов"
						icon={<span className={styles.refunded}>Возвращён</span>}
						value={refundedOrdersCount}
					/>
					<Table
						className={cn(styles.table, styles.purchasers)}
						heading={{
							title: 'Топ 5 покупателей',
							icon: Trophy,
						}}
						labels={[
							'Аватар',
							'Логин',
							'Кол-во заказов',
							'Общая сумма заказов',
						]}
						rows={topPurchasers.map((purchaser) => ({
							columns: [
								{ value: purchaser.avatarPath, isImage: true },
								{ value: purchaser.login },
								{ value: String(purchaser.ordersCount) },
								{ value: `${purchaser.ordersAmount} ₽` },
							],
						}))}
						imageWidth={40}
						imageHeight={40}
					/>
					<Table
						className={cn(styles.table, styles.services)}
						heading={{
							title: 'Топ 5 Популярных услуг',
							icon: ShoppingBag,
						}}
						labels={[
							'Номер',
							'Картинка',
							'Имя',
							'Категории',
							'Количество заказов',
						]}
						rows={popularServices.map((service) => ({
							columns: [
								{ value: String(service.id) },
								{ value: service.coverPath, isImage: true },
								{ value: service.name },
								{ value: service.categories.join(', ') },
								{ value: String(service.orderTimes) },
							],
						}))}
						imageWidth={60}
						imageHeight={40}
					/>
				</div>
			</div>
		</div>
	)
}

export default ManageAnalytics
