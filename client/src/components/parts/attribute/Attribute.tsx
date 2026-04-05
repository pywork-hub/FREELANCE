import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import Modal from '@/components/ui/templates/modal/Modal'
import { ADMIN_EDITS } from '@/constants/url.constants'
import type { IAttribute } from '@/shared/interfaces/attribute/attribute.interface'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import cn from 'clsx'
import { useState, type FC } from 'react'
import styles from './Attribute.module.scss'

const Attribute: FC<IAttribute & IManageItem & IClassName> = ({
	attribute,
	place = 'public',
	deleteHandler,
	duplicateHandler,
	className,
}) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<li className={cn(styles.attribute, className && className)}>
			<h3 className={styles.name}>{attribute.name}</h3>
			<button className={styles.opener} onClick={() => setIsShow(true)}>
				Посмотреть опции
			</button>
			{isShow && attribute.properties.length > 0 && (
				<Modal heading="Опции" closeModal={() => setIsShow(false)}>
					<ul className={styles.properties}>
						{attribute.properties.map((property) => (
							<li className={styles.property}>{property.name}</li>
						))}
					</ul>
				</Modal>
			)}
			<ManageActions
				place={place}
				editUrl={ADMIN_EDITS.ATTRIBUTE(attribute.id)}
				duplicateHandler={duplicateHandler}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default Attribute
