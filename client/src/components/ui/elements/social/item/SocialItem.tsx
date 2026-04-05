import cn from 'clsx'
import Link from 'next/link'
import type { FC } from 'react'
import styles from '../Social.module.scss'
import type { ISocialItemProps } from '../interface/social.interface'

const SocialItem: FC<ISocialItemProps> = ({
	item,
	itemClassName,
	linkClassName,
}) => {
	return (
		<li className={itemClassName && itemClassName}>
			<Link
				href={item.href}
				className={cn(styles.link, linkClassName && linkClassName)}
			>
				{<item.icon />}
			</Link>
		</li>
	)
}

export default SocialItem
