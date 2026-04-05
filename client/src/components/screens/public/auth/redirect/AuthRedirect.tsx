import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { SITE_NAME } from '@/constants/seo.constants'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './AuthRedirect.module.scss'

const AuthRedirect: FC = () => {
	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Добро пожаловать в <span>{SITE_NAME}</span>
					</Heading>
					<ul className={styles.list}>
						<li className={styles.item}>
							<Link href={PUBLIC_PAGES.HOME} className={styles.btn}>
								<Home />
								<span>На Главную</span>
							</Link>
						</li>
						<li className={styles.item}>
							<Link href={PUBLIC_PAGES.MARKET} className={styles.btn}>
								<ShoppingBag />
								<span>Все услуги</span>
							</Link>
						</li>
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default AuthRedirect
