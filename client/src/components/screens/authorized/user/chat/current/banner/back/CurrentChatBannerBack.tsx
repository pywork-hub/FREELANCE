'use client'

import { USER_PAGES } from '@/constants/url.constants'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import styles from '../CurrentChatBanner.module.scss'

const CurrentChatBannerBack: FC = () => {
	const { push } = useRouter()

	return (
		<button onClick={() => push(USER_PAGES.CHAT())} className={styles.back}>
			<ChevronLeft />
		</button>
	)
}

export default CurrentChatBannerBack
