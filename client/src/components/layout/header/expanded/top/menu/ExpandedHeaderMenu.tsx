import Dropdown from '@/components/ui/elements/dropdown/Dropdown'
import Menu from '@/components/ui/elements/menu/Menu'
import type { FC } from 'react'
import styles from './ExpandedHeaderMenu.module.scss'
import { EXPANDED_HEADER_MENU_DATA } from './data/expanded-header-menu.data'

const ExpandedHeaderMenu: FC = () => {
	return (
		<Menu
			items={EXPANDED_HEADER_MENU_DATA.items}
			listClassName={styles.list}
			itemClassName={styles.item}
			linkClassName={styles.link}
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
							items={EXPANDED_HEADER_MENU_DATA.items.slice(-3, -1)}
						/>
					</Dropdown>
				</li>
			}
		/>
	)
}

export default ExpandedHeaderMenu
