import Contact from '@/components/screens/public/contact/Contact'
import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Свяжитесь с нами | ${SITE_NAME}`,
	description: `Свяжитесь с нами | ${SITE_NAME}`,
	keywords: [
		SITE_NAME,
		'Контакты',
		'Свяжитесь с нами',
		'Связь с нами',
		`Связь с ${SITE_NAME}`,
	],
}

export default function ContactPage() {
	return <Contact />
}
