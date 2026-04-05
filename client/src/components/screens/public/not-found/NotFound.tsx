import Container from '@/components/ui/common/container/Container'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './NotFound.module.scss'

const NotFound: FC = () => {
	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<StaticImage
						src="/images/pages/not-found/not-found.svg"
						width={150}
						height={214}
						alt="Not Found"
					/>
					<Heading variant="h1" className={styles.heading}>
						Ищете что-то?
					</Heading>
					<p className={styles.text}>
						Мы не можем найти эту страницу. Но мы можем помочь вам найти новые{' '}
						<Link href={PUBLIC_PAGES.MARKET} className={styles.market}>
							услуги
						</Link>
						.
					</p>
					<Link className={styles.home} href={PUBLIC_PAGES.HOME}>
						Перейти на главную
					</Link>
				</div>
			</Container>
		</Section>
	)
}

export default NotFound
