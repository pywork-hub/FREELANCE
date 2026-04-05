import { Sort, Visibility } from '@/__generated__/output'
import Container from '@/components/ui/common/container/Container'
import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import Menu from '@/components/ui/elements/menu/Menu'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { useCategories } from '@/hooks/public/categories/useCategories'
import type { IMenuItem } from '@/shared/interfaces/menu/menu.interface'
import type { FC } from 'react'
import styles from './ExpandedHeaderCategories.module.scss'

const ExpandedHeaderCategories: FC = async () => {
	const { categories } = await useCategories({
		sort: Sort.Desc,
		visibility: Visibility.Visible,
		isParents: true,
	})
	if (categories.length === 0) return null

	return (
		<div className={styles.categories}>
			<Container>
				<nav className={styles.nav}>
					<Menu
						listClassName={styles.list}
						itemClassName={styles.item}
						linkClassName={styles.link}
						items={categories.map(
							(category): IMenuItem => ({
								label: category.name,
								href: PUBLIC_PAGES.CATEGORY(category.slug),
							})
						)}
						additionalItem={
							<li className={styles.more}>
								<div className={styles.moreLink}>
									Еще
									<div className={styles.ellipsis}>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
								<Dropdown className={styles.dropdown}>
									<Menu
										listClassName={styles.dropdownList}
										itemClassName={styles.dropdownItem}
										linkClassName={styles.dropdownLink}
										items={categories.slice(-5).map(
											(category): IMenuItem => ({
												label: category.name,
												href: PUBLIC_PAGES.CATEGORY(category.slug),
											})
										)}
									/>
								</Dropdown>
							</li>
						}
					/>
				</nav>
			</Container>
		</div>
	)
}

export default ExpandedHeaderCategories
