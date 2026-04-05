import About from '@/components/screens/public/about/About'
import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `О проекте | ${SITE_NAME}`,
	description: `О проекте | ${SITE_NAME}`,
	keywords: [SITE_NAME, 'О нас', 'О проекте', `О ${SITE_NAME}`],
}

export default function AboutPage() {
	return <About />
}
