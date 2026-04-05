import { PageType } from '@/__generated__/output'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Block from '@/components/ui/elements/block/Block'
import { useBlock } from '@/hooks/public/blocks/useBlock'
import type { FC } from 'react'
import styles from './HomeAbout.module.scss'

const HomeAbout: FC = async () => {
	const { block, error } = await useBlock(PageType.Home)

	if (!block || error) return null

	return (
		<Section className={styles.section}>
			<Container>
				<Block block={block} />
			</Container>
		</Section>
	)
}

export default HomeAbout
