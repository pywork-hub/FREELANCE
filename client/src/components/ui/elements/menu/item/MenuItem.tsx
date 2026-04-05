import type { IMenuItemProps } from '@/shared/interfaces/menu/menu.interface'
import Link from 'next/link'
import type { FC } from 'react'

const MenuItem: FC<IMenuItemProps> = ({
	item,
	itemClassName,
	linkClassName,
}) => {
	return (
		<li className={itemClassName && itemClassName}>
			{item.onClick ? (
				<button
					type="button"
					className={linkClassName && linkClassName}
					onClick={item.onClick}
				>
					{item.icon && <item.icon />}
					{item.label}
				</button>
			) : (
				<Link className={linkClassName && linkClassName} href={item.href}>
					{item.icon && <item.icon />}
					{item.label}
				</Link>
			)}
		</li>
	)
}

export default MenuItem
