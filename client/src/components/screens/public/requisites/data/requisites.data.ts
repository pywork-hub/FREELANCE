import { SITE_EMAIL, SITE_NAME } from '@/constants/seo.constants'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import type { IBoxes } from '@/shared/interfaces/box/box.interface'
import { ClipboardList, Mail, MapPinned, PhoneCall, School } from 'lucide-react'

export const REQUISITES_DATA: IBoxes = {
	items: [
		{
			icon: School,
			name: 'Название компании',
			description: `<a href="${PUBLIC_PAGES.HOME}">${SITE_NAME}</a>`,
		},
		{
			icon: MapPinned,
			name: 'Физический адрес',
			description: `Улица Романоса Меликяна / 2А / 33 / Малатия-Себастия 0065
				Ереван Армения`,
		},
		{
			icon: Mail,
			name: 'Электронная почта',
			description: `<a href="mailto: ${SITE_EMAIL}">${SITE_EMAIL}</a>`,
		},
		{
			icon: PhoneCall,
			name: 'Номер телефона',
			description: `<a href="tel: 37496361964">+374 (96) 36-19-64</a>`,
		},
		{
			icon: ClipboardList,
			name: 'Учетный номер',
			description: `290.1390196`,
		},
	],
}
