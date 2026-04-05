import { PUBLIC_PAGES } from '@/constants/url.constants'
import cn from 'clsx'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './ExpandedHeaderBurgerButtons.module.scss'

const ExpandedHeaderBurgerButtons: FC = () => {
	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<Link
					className={cn(styles.link, styles.login)}
					href={PUBLIC_PAGES.LOGIN}
				>
					Войти
				</Link>
			</li>
			<li className={styles.item}>
				<Link
					className={cn(styles.link, styles.register)}
					href={PUBLIC_PAGES.REGISTER}
				>
					Регистрация
				</Link>
			</li>
		</ul>
	)
}

export default ExpandedHeaderBurgerButtons
