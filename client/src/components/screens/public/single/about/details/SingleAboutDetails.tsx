import type { ICurrentService } from '@/shared/interfaces/service/service.interface'
import { termFormat } from '@/utils/formats/term/term-format.util'
import type { FC } from 'react'
import styles from './SingleAboutDetails.module.scss'

const SingleAboutDetails: FC<ICurrentService> = ({ service }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.priceInfo}>
				<span className={styles.priceFrom}>Мин. Цена:</span>
				{service.fromSalePrice ? (
					<div className={styles.saleBox}>
						<span className={styles.price}>{service.fromPrice} ₽</span>
						<span className={styles.percent}>
							{Math.round(
								-100 + (service.fromSalePrice * 100) / service.fromPrice
							)}
							%
						</span>
						<span className={styles.salePrice}>{service.fromSalePrice} ₽</span>
					</div>
				) : (
					<div className={styles.priceBox}>
						<span className={styles.price}>{service.fromPrice} ₽</span>
					</div>
				)}
			</div>
			<div className={styles.termInfo}>
				<span className={styles.termFrom}>Мин. Срок:</span>
				<span className={styles.termTime}>{termFormat(service.fromTerm)}</span>
			</div>
		</div>
	)
}

export default SingleAboutDetails
