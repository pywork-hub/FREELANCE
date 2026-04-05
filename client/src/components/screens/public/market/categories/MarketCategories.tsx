import Category from '@/components/parts/category/Category'
import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import type { ICatalogCategories } from '@/shared/interfaces/category/category.interface'
import type { FC } from 'react'
import styles from './MarketCategories.module.scss'

const MarketCategories: FC<ICatalogCategories> = ({ categories }) => {
	return (
		<Section>
			<Container>
				<div className={styles.wrapper}>
					<ul className={styles.categories}>
						{categories.map((category, index) => (
							<Category
								key={index}
								// @ts-ignore
								category={category}
								className={styles.category}
							/>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	)
}

export default MarketCategories
