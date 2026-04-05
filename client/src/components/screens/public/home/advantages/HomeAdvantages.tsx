import Box from '@/components/parts/box/Box'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import type { FC } from 'react'
import styles from './HomeAdvantages.module.scss'
import { HOME_ADVANTAGES_DATA } from './data/home-advantages.data'

const HomeAdvantages: FC = () => {
	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Наши преимущества
					</Heading>
					<ul className={styles.advantages}>
						{HOME_ADVANTAGES_DATA.items.map((item, index) => (
							<Box key={index} className={styles.advantage} item={item} />
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default HomeAdvantages
