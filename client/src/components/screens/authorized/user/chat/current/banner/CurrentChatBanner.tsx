import { UserRole } from '@/__generated__/output'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import type { ICurrentRoom } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import { CircleEllipsis } from 'lucide-react'
import type { FC } from 'react'
import styles from './CurrentChatBanner.module.scss'
import CurrentChatBannerChange from './actions/change/CurrentChatBannerChange'
import CurrentChatBannerDelete from './actions/delete/CurrentChatBannerDelete'
import CurrentChatBannerExample from './actions/example/CurrentChatBannerExample'
import CurrentChatBannerOffer from './actions/offer/CurrentChatBannerOffer'
import CurrentChatBannerReview from './actions/review/CurrentChatBannerReview'
import CurrentChatBannerActivity from './activity/CurrentChatBannerActivity'
import CurrentChatBannerBack from './back/CurrentChatBannerBack'

const CurrentChatBanner: FC<ICurrentRoom & TypeExistUser> = ({
	room,
	user,
}) => {
	return (
		<div className={styles.banner}>
			<div className={styles.user}>
				<CurrentChatBannerBack />
				<StaticImage
					className={styles.avatar}
					src={room.partner.profile.avatarPath}
					width={36}
					height={36}
					alt={room.partner.profile.login}
				/>
				<div className={styles.info}>
					<h3 className={styles.login}>{room.partner.profile.login}</h3>
					<CurrentChatBannerActivity
						userId={room.partner.id}
						activity={room.partner.activity}
					/>
				</div>
			</div>
			{(user.roles.includes(UserRole.Manager) ||
				user.roles.includes(UserRole.Admin)) && (
				<div className={styles.toggle}>
					<CircleEllipsis />
					<Dropdown className={styles.dropdown}>
						<CurrentChatBannerOffer roomId={room.id} />
						<CurrentChatBannerReview user={user} roomId={room.id} />
						<CurrentChatBannerExample room={room} user={user} />
						<CurrentChatBannerChange roomId={room.id} />
						{user.roles.includes(UserRole.Admin) && (
							<CurrentChatBannerDelete roomId={room.id} />
						)}
					</Dropdown>
				</div>
			)}
		</div>
	)
}

export default CurrentChatBanner
