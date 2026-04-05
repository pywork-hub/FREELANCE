import type { FC } from 'react'
import MenuItem from './item/MenuItem'
import type { IMenuProps } from '@/shared/interfaces/menu/menu.interface'

const Menu: FC<IMenuProps> = ({
	items,
	listClassName,
	itemClassName,
	linkClassName,
	additionalItem,
}) => {
	return (
		<ul className={listClassName && listClassName}>
			{items.map((item, index) => (
				<MenuItem
					key={index}
					item={item}
					itemClassName={itemClassName}
					linkClassName={linkClassName}
				/>
			))}
			{additionalItem}
		</ul>
	)
}

export default Menu
