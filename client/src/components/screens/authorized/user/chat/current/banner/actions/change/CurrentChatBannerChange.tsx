'use client'

import StaticImage from '@/components/ui/common/image/StaticImage'
import Modal from '@/components/ui/templates/modal/Modal'
import { useChangeRoomManager } from '@/hooks/user/room/useChangeRoomManager'
import { useOtherManagers } from '@/hooks/user/room/useOtherManagers'
import type { IRoomId } from '@/shared/interfaces/room/room.interface'
import { useState, type FC } from 'react'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerChange: FC<IRoomId> = ({ roomId }) => {
	const [isShow, setIsShow] = useState(false)
	const { managers } = useOtherManagers()
	const { changeManager } = useChangeRoomManager()

	return (
		<>
			<button className={styles.changeBtn} onClick={() => setIsShow(true)}>
				Менеджеры
			</button>
			{isShow && (
				<Modal
					heading="Выбрать другого менеджера"
					closeModal={() => setIsShow(false)}
				>
					{managers.length > 0 ? (
						<ul className={styles.managers}>
							{managers.map((manager) => (
								<li className={styles.manager}>
									<button
										className={styles.managerBtn}
										onClick={() =>
											changeManager({
												managerId: manager.id,
												roomId,
											})
										}
									>
										<StaticImage
											src={manager.profile.avatarPath}
											width={33}
											height={33}
											alt={manager.profile.login}
										/>
										{manager.profile.login}
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className={styles.managersNotFound}>Менеджеров не найдено.</p>
					)}
				</Modal>
			)}
		</>
	)
}

export default CurrentChatBannerChange
