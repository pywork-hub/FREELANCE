'use client'

import StaticImage from '@/components/ui/common/image/StaticImage'
import Logo from '@/components/ui/elements/logo/Logo'
import Menu from '@/components/ui/elements/menu/Menu'
import { useToggleBodyOverflow } from '@/hooks/helpers/body/useToggleBodyOverflow'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import { Menu as BurgerIcon, X } from 'lucide-react'
import { useState, type FC } from 'react'
import styles from './ExpandedHeaderBurger.module.scss'
import ExpandedHeaderBurgerButtons from './buttons/ExpandedHeaderBurgerButtons'
import {
	EXPANDED_HEADER_BURGER_AUTH_MENU_DATA,
	EXPANDED_HEADER_BURGER_MENU_DATA,
} from './data/expanded-header-burger-menu.data'
import ExpandedHeaderBurgerLogout from './logout/ExpandedHeaderBurgerLogout'

const ExpandedHeaderBurger: FC<TypeIronUser> = ({ user }) => {
	const [isShow, setIsShow] = useState(false)
	useToggleBodyOverflow(isShow)

	return (
		<>
			<button className={styles.opener} onClick={() => setIsShow(true)}>
				<BurgerIcon />
			</button>
			{isShow && (
				<div className={styles.overlay}>
					<div className={styles.burger}>
						<div className={styles.wrapper}>
							<div className={styles.top}>
								<button
									onClick={() => setIsShow(false)}
									className={styles.close}
								>
									<X />
								</button>
								<Logo width={95} height={21} />
							</div>
							{user && (
								<div className={styles.info}>
									<div className={styles.avatar}>
										<StaticImage
											src={user.profile.avatarPath}
											width={33}
											height={33}
											alt={user.profile.login}
										/>
									</div>
									<span>{user.profile.login}</span>
								</div>
							)}
							<div className={styles.fill}>
								<nav className={styles.nav}>
									{user && (
										<Menu
											items={EXPANDED_HEADER_BURGER_AUTH_MENU_DATA.items}
											listClassName={styles.list}
											linkClassName={styles.link}
											additionalItem={
												<li className={styles.item}>
													<ExpandedHeaderBurgerLogout />
												</li>
											}
										/>
									)}
									<Menu
										items={EXPANDED_HEADER_BURGER_MENU_DATA.items}
										listClassName={styles.list}
										linkClassName={styles.link}
									/>
								</nav>
								{!user && <ExpandedHeaderBurgerButtons />}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ExpandedHeaderBurger
