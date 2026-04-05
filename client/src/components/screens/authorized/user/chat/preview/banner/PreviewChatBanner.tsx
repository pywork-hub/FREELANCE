import { Send } from 'lucide-react'
import type { FC } from 'react'
import styles from './PreviewChatBanner.module.scss'

const PreviewChatBanner: FC = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.box}>
				<div className={styles.circle}>
					<Send />
				</div>
				<p className={styles.text}>Выберите собеседника.</p>
			</div>
		</div>
	)
}

export default PreviewChatBanner
