'use client'

import Modal from '@/components/ui/templates/modal/Modal'
import { useState, type FC } from 'react'
import styles from './ExpandedFooter.module.scss'
import ExpandedFooterBottom from './bottom/ExpandedFooterBottom'
import ExpandedFooterColumns from './columns/ExpandedFooterColumns'

const ExpandedFooter: FC = () => {
	const [isShow, setIsShow] = useState(false)

	return (
		<>
			<footer className={styles.footer}>
				<ExpandedFooterColumns setIsShow={setIsShow} />
				<ExpandedFooterBottom setIsShow={setIsShow} />
			</footer>
			{isShow && (
				<Modal
					closeModal={() => setIsShow(false)}
					heading="Мобильное приложение"
				>
					<div className={styles.soon}>
						<h3>Наше мобильное приложение уже скоро!</h3>
						<p>
							Готовьтесь к новому уровню удобства и возможностей прямо на вашем
							устройстве. Мы не можем дождаться, чтобы поделиться этим с вами!
						</p>
					</div>
				</Modal>
			)}
		</>
	)
}

export default ExpandedFooter
