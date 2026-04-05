'use client'

import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './MarketNotFound.module.scss'

const MarketNotFound: FC = () => {
	return (
		<Section>
			<Container>
				<div className={styles.wrapper}>
					<Link className={styles.back} href={PUBLIC_PAGES.MARKET}>
						<MoveLeft />
						Все услуги
					</Link>
					<div className={styles.fill}>
						<p className={styles.text}>Услуги не найдены.</p>
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default MarketNotFound
