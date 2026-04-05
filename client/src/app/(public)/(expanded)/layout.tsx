import ExpandedFooter from '@/components/layout/footer/expanded/ExpandedFooter'
import ExpandedHeader from '@/components/layout/header/expanded/ExpandedHeader'
import type { PropsWithChildren } from 'react'

export default function PublicExpandedLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<>
			<ExpandedHeader />
			<main>{children}</main>
			<ExpandedFooter />
		</>
	)
}
