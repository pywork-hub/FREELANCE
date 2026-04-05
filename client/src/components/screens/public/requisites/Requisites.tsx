import Box from '@/components/parts/box/Box'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import type { FC } from 'react'
import styles from './Requisites.module.scss'
import { REQUISITES_DATA } from './data/requisites.data'

const Requisites: FC = () => {
	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Наши Реквизиты
					</Heading>
					<ul className={styles.requisites}>
						{REQUISITES_DATA.items.map((item, index) => (
							<Box key={index} className={styles.requisite} item={item} />
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default Requisites
