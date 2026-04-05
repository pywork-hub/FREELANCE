import type { Metadata } from 'next'

import CurrentChat from '@/components/screens/authorized/user/chat/current/CurrentChat'
import PreviewChat from '@/components/screens/authorized/user/chat/preview/PreviewChat'
import { NO_INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'
import { useCurrentRoom } from '@/hooks/user/room/useCurrentRoom'
import type { IPageSlugParam } from '@/shared/interfaces/param/param.interface'

export const metadata: Metadata = {
	title: `Чат | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default async function ChatRoomPage({ params }: IPageSlugParam) {
	const { room, error } = await useCurrentRoom(params?.slug)

	if (error || !params?.slug || !room) {
		return <PreviewChat />
	}

	return <CurrentChat room={room} />
}
