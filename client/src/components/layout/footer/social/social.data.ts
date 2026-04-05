import { PUBLIC_PAGES } from '@/constants/url.constants'
import type { ISocial } from '@/shared/interfaces/social/social.interface'
import { Instagram, Twitter } from 'lucide-react'

export const SOCIAL_DATA: ISocial = {
	items: [
		{
			icon: Instagram,
			href: PUBLIC_PAGES.HOME,
		},
		{
			icon: Twitter,
			href: PUBLIC_PAGES.HOME,
		},
	],
}