import '@/assets/styles/global.scss'
import { SITE_EMAIL, SITE_NAME, SITE_URL } from '@/constants/seo.constants'
import MainProvider from '@/providers/MainProvider'
import cn from 'clsx'
import type { Metadata, Viewport } from 'next'
import { Nunito, Source_Sans_3 } from 'next/font/google'

const nunito = Nunito({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	display: 'swap',
})

const source = Source_Sans_3({
	weight: ['300', '400', '500', '700'],
	style: ['normal'],
	subsets: ['cyrillic'],
	variable: '--font-source',
	display: 'swap',
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
	},
	metadataBase: new URL(SITE_URL),
	openGraph: {
		siteName: SITE_NAME,
		emails: SITE_EMAIL,
		type: 'website',
		locale: 'ru_RU',
	},
	icons: [
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-16x16.png',
			sizes: '16x16',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-24x24.png',
			sizes: '24x24',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-32x32.png',
			sizes: '32x32',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-48x48.png',
			sizes: '48x48',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-57x57.png',
			sizes: '57x57',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-60x60.png',
			sizes: '60x60',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-72x72.png',
			sizes: '72x72',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-83.5x83.5.png',
			sizes: '83.5x83.5',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-96x96.png',
			sizes: '96x96',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-114x114.png',
			sizes: '114x114',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-128x128.png',
			sizes: '128x128',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-167x167.png',
			sizes: '167x167',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-180x180.png',
			sizes: '180x180',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-192x192.png',
			sizes: '192x192',
			type: 'image/png',
		},
		{
			rel: 'icon',
			url: '/metadata/favicons/favicon-195x195.png',
			sizes: '195x195',
			type: 'image/png',
		},
	],
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	applicationName: SITE_NAME,
	manifest: '/metadata/manifest/manifest.json',
}

export const viewport: Viewport = {
	maximumScale: 1,
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={cn(nunito.variable, source.variable)}>
				<MainProvider>
					{children}
					<div id="modal"></div>
					<div id="gallery"></div>
				</MainProvider>
			</body>
		</html>
	)
}
