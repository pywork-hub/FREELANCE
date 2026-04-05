import type {
	ISocial,
	ISocialItem,
} from '@/shared/interfaces/social/social.interface'

export interface ISocialItemProps {
	item: ISocialItem
	itemClassName?: string
	linkClassName?: string
}

export interface ISocialProps extends ISocial {
	listClassName?: string
	itemClassName?: string
	linkClassName?: string
}
