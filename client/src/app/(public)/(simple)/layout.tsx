import SimpleFooter from '@/components/layout/footer/simple/SimpleFooter'
import SimpleHeader from '@/components/layout/header/simple/SimpleHeader'
import type { PropsWithChildren } from 'react'

export default function PublicSimpleLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<>
			<SimpleHeader />
			<main>{children}</main>
			<SimpleFooter />
		</>
	)
}
