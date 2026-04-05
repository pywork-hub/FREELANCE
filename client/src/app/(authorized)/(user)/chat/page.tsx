import type { Metadata } from 'next'

import PreviewChat from '@/components/screens/authorized/user/chat/preview/PreviewChat'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: `Чат | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function ChatPage() {
	return <PreviewChat />
}
