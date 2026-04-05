import { Sort, Visibility } from '@/__generated__/output'
import Category from '@/components/parts/category/Category'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { useCategories } from '@/hooks/public/categories/useCategories'
import type { FC } from 'react'
import styles from './HomeCategories.module.scss'

const HomeCategories: FC = async () => {
	const { categories, error } = await useCategories({
		sort: Sort.Desc,
		visibility: Visibility.Visible,
		isParents: true,
	})
	if (categories.length === 0 || error) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h2" className={styles.heading}>
						Выберите категорию, чтобы начать.
					</Heading>
					<ul className={styles.categories}>
						{categories.map((category, index) => (
							<Category
								className={styles.category}
								category={category}
								key={index}
							/>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default HomeCategories
