import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { PUBLIC_PAGES, USER_PAGES } from '@/constants/url.constants'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import { Home, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Thanks.module.scss'

const Thanks: FC<IPageSearchParam> = ({ searchParams }) => {
	const chatLogin = searchParams?.login ? String(searchParams.login) : undefined

	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Спасибо за заказ :)
					</Heading>
					<ul className={styles.list}>
						<li className={styles.item}>
							<Link href={PUBLIC_PAGES.HOME} className={styles.btn}>
								<Home />
								<span>Главная</span>
							</Link>
						</li>
						<li className={styles.item}>
							<Link href={USER_PAGES.CHAT(chatLogin)} className={styles.btn}>
								<MessageCircleMore />
								<span>Чат</span>
							</Link>
						</li>
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default Thanks
