'use client'

import Container from '@/components/ui/common/container/Container'
import StaticImage from '@/components/ui/common/image/StaticImage'
import Social from '@/components/ui/elements/social/Social'
import Modal from '@/components/ui/templates/modal/Modal'
import { useState, type FC } from 'react'
import { SOCIAL_DATA } from '../social/social.data'
import styles from './SimpleFooter.module.scss'

const SimpleFooter: FC = () => {
	const [isShow, setIsShow] = useState(false)

	return (
		<footer className={styles.footer}>
			<div className={styles.wrapper}>
				<Container>
					<div className={styles.fill}>
						<Social items={SOCIAL_DATA.items} listClassName={styles.list} />
						<div className={styles.buttons}>
							<button onClick={() => setIsShow(true)} className={styles.button}>
								<StaticImage
									src="/images/global/app-store.png"
									width={140}
									height={48}
									alt="App Store"
								/>
							</button>
							<button onClick={() => setIsShow(true)} className={styles.button}>
								<StaticImage
									src="/images/global/google-play.png"
									width={140}
									height={48}
									alt="App Store"
								/>
							</button>
						</div>
						{isShow && (
							<Modal
								closeModal={() => setIsShow(false)}
								heading="Мобильное приложение"
							>
								<div className={styles.soon}>
									<h3>Наше мобильное приложение уже скоро!</h3>
									<p>
										Готовьтесь к новому уровню удобства и возможностей прямо на
										вашем устройстве. Мы не можем дождаться, чтобы поделиться
										этим с вами!
									</p>
								</div>
							</Modal>
						)}
					</div>
				</Container>
			</div>
		</footer>
	)
}

export default SimpleFooter
