import type { FC } from 'react'
import type { ISocialProps } from './interface/social.interface'
import SocialItem from './item/SocialItem'

const Social: FC<ISocialProps> = ({
	items,
	listClassName,
	itemClassName,
	linkClassName,
}) => {
	return (
		<ul className={listClassName && listClassName}>
			{items.map((item, index) => (
				<SocialItem
					key={index}
					item={item}
					itemClassName={itemClassName}
					linkClassName={linkClassName}
				/>
			))}
		</ul>
	)
}

export default Social
