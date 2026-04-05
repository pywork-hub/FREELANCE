import Faq from '@/components/screens/public/faq/Faq'
import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Вопросы - Ответы | ${SITE_NAME}`,
	description: `Вопросы - Ответы | ${SITE_NAME}`,
	keywords: [
		SITE_NAME,
		'Вопросы - Ответы',
		'FAQ',
		'faq',
		`Вопросы - Ответ ${SITE_NAME}`,
	],
}

export default function FaqPage() {
	return <Faq />
}
