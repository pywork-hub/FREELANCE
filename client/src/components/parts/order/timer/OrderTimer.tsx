import { useOrderTermTimer } from '@/hooks/helpers/order/useOrderTermTimer'
import type { IOrderTimer } from '@/shared/interfaces/order/order.interface'
import { padStartFormat } from '@/utils/formats/date/pad-start-format.util'
import type { FC } from 'react'
import styles from '../Order.module.scss'

const OrderTimer: FC<IOrderTimer> = ({ startTime, term }) => {
	const { days, hours, minutes, seconds } = useOrderTermTimer(startTime, term)

	return (
		<ul className={styles.timer}>
			{days > 0 && <li>{padStartFormat(days)}d</li>}
			{hours > 0 && <li>{padStartFormat(hours)}h</li>}
			{minutes > 0 && <li>{padStartFormat(minutes)}m</li>}
			{seconds > 0 && <li>{padStartFormat(seconds)}s</li>}
		</ul>
	)
}

export default OrderTimer
