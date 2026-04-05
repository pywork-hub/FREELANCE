import { Visibility } from '@/__generated__/output'
import type { IManageActions } from '@/shared/interfaces/manage/manage.interface'
import { Baby, Copy, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import ToggleSwitch from '../../common/form/toggle-switch/ToggleSwitch'
import styles from './ManageActions.module.scss'

const ManageActions: FC<IManageActions> = ({
	place,
	deleteHandler,
	duplicateHandler,
	toggleHandler,
	editUrl,
	childrensUrl,
	visibility,
}) => {
	return (
		place === 'admin' && (
			<div className={styles.actions}>
				{editUrl && (
					<Link className={styles.action} href={editUrl}>
						<Pencil />
					</Link>
				)}
				{childrensUrl && (
					<Link className={styles.action} href={childrensUrl}>
						<Baby />
					</Link>
				)}
				{duplicateHandler && (
					<button className={styles.action} onClick={duplicateHandler}>
						<Copy />
					</button>
				)}
				{deleteHandler && (
					<button className={styles.action} onClick={deleteHandler}>
						<Trash2 />
					</button>
				)}
				{visibility && toggleHandler && (
					<ToggleSwitch
						isVisible={visibility === Visibility.Visible}
						onChange={toggleHandler}
					/>
				)}
			</div>
		)
	)
}

export default ManageActions
