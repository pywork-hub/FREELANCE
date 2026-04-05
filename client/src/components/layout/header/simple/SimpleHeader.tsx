import Container from '@/components/ui/common/container/Container'
import Logo from '@/components/ui/elements/logo/Logo'
import type { FC } from 'react'
import styles from './SimpleHeader.module.scss'

const SimpleHeader: FC = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.wrapper}>
					<Logo width={120} height={25} className={styles.logo} />
				</div>
			</Container>
		</header>
	)
}

export default SimpleHeader
