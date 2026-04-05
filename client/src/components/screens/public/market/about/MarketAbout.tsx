import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Block from '@/components/ui/elements/block/Block'
import type { IMarketAbout } from '@/shared/interfaces/market/market.interface'
import type { FC } from 'react'
import styles from './MarketAbout.module.scss'

const MarketAbout: FC<IMarketAbout> = ({ block }) => {
	if (!block) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Block block={block} />
				</div>
			</Container>
		</Section>
	)
}

export default MarketAbout
