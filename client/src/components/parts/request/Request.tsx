import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import Modal from '@/components/ui/templates/modal/Modal'
import { ADMIN_VIEWS } from '@/constants/url.constants'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import type { IRequest } from '@/shared/interfaces/request/request.interface'
import cn from 'clsx'
import { useState, type FC } from 'react'
import styles from './Request.module.scss'

const Request: FC<IRequest & IManageItem & IClassName> = ({
	request,
	place = 'admin',
	deleteHandler,
	className,
}) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<li className={cn(styles.request, className && className)}>
			<div className={styles.info}>
				<div className={styles.box}>
					<span className={styles.label}>Имя: </span>
					<span className={styles.value}>{request.firstName}</span>
				</div>
				<div className={styles.box}>
					<span className={styles.label}>Фамилия: </span>
					<span className={styles.value}>{request.lastName}</span>
				</div>
				<div className={styles.box}>
					<span className={styles.label}>E-mail: </span>
					<span className={styles.value}>{request.email}</span>
				</div>
				<button className={styles.opener} onClick={() => setIsShow(true)}>
					Посмотреть сообщение
				</button>
				{isShow && (
					<Modal
						heading="Message"
						closeModal={() => setIsShow(false)}
						size="lg"
					>
						<div className={styles.message}>{request.message}</div>
					</Modal>
				)}
			</div>
			<ManageActions
				place={place}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default Request
