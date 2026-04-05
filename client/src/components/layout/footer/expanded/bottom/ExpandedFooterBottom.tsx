'use client'

import Container from '@/components/ui/common/container/Container'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Social from '@/components/ui/elements/social/Social'
import type { IModalState } from '@/shared/interfaces/modal/modal.interface'
import type { FC } from 'react'
import { SOCIAL_DATA } from '../../social/social.data'
import styles from './ExpandedFooterBottom.module.scss'

const ExpandedFooterBottom: FC<IModalState> = ({ setIsShow }) => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<Social items={SOCIAL_DATA.items} listClassName={styles.list} />
					<div className={styles.buttons}>
						<button className={styles.button} onClick={() => setIsShow(true)}>
							<StaticImage
								src="/images/global/app-store.png"
								width={140}
								height={48}
								alt="App Store"
							/>
						</button>
						<button className={styles.button} onClick={() => setIsShow(true)}>
							<StaticImage
								src="/images/global/google-play.png"
								width={140}
								height={48}
								alt="App Store"
							/>
						</button>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default ExpandedFooterBottom
