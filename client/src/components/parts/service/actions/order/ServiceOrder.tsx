'use client'

import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import Quantity from '@/components/ui/elements/quantity/Quantity'
import Modal from '@/components/ui/templates/modal/Modal'
import { useOrderService } from '@/hooks/user/service/useOrderService'
import { ShoppingCart } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from '../../Service.module.scss'

const ServiceOrder: FC<{ slug: string }> = ({ slug }) => {
	const [isShow, setIsShow] = useState(false)
	const [count, setCount] = useState(1)
	const { orderService, loading } = useOrderService({
		quantity: count,
		serviceSlug: slug,
	})

	return (
		<>
			<button className={styles.order} onClick={() => setIsShow(true)}>
				<ShoppingCart />
				<span>Заказать услугу</span>
			</button>
			{isShow && (
				<Modal heading="Подтвердить заказ" closeModal={() => setIsShow(false)}>
					<p className={styles.confirmText}>
						После подтверждения мы создадим чат с одним из наших менеджеров, где
						вы сможете обсудить все детали вашего заказа. Пожалуйста, выберите
						количество и нажмите кнопку <span>Подтвердить</span>.
					</p>
					<div className={styles.confirmFill}>
						<Quantity count={count} setCount={setCount} />
						{loading ? (
							<MiniLoader className={styles.loader} />
						) : (
							<button className={styles.confirmBtn} onClick={orderService}>
								Подтвердить
							</button>
						)}
					</div>
				</Modal>
			)}
		</>
	)
}

export default ServiceOrder
