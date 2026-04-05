import StaticImage from '@/components/ui/common/image/StaticImage'
import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import { ADMIN_EDITS } from '@/constants/url.constants'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import type { IUser } from '@/shared/interfaces/user/user.interface'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './User.module.scss'

const User: FC<IUser & IManageItem & IClassName> = ({
	user,
	place = 'public',
	deleteHandler,
	className,
}) => {
	return (
		<li className={cn(styles.user, className && className)}>
			<div className={styles.avatar}>
				<StaticImage
					src={user.profile.avatarPath}
					width={80}
					height={80}
					alt={user.profile.login}
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.box}>
					<span className={styles.label}>E-mail: </span>
					<span className={styles.value}>{user.profile.email}</span>
				</div>
				<div className={styles.box}>
					<span className={styles.label}>Логин: </span>
					<span className={styles.value}>{user.profile.login}</span>
				</div>
				<div className={styles.box}>
					<span className={styles.label}>Роли: </span>
					<ul className={styles.roles}>
						{user.roles.map((role, index) => (
							<li key={index} className={styles.role}>
								{role}
							</li>
						))}
					</ul>
				</div>
			</div>
			<ManageActions
				place={place}
				editUrl={ADMIN_EDITS.USER(user.id)}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default User
