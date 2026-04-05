import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import { PUBLIC_PAGES } from '@/constants/url.constants'
import { useJwtAuthRegister } from '@/hooks/public/auth/jwt/useJwtAuthRegister'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import styles from '../AuthConfirm.module.scss'

const AuthConfirmWrapper: FC<{ token: string }> = ({ token }) => {
	const { loading, error } = useJwtAuthRegister(token)

	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					{loading ? <MiniLoader className={styles.loader} /> : null}
					{error && (
						<Link className={styles.back} href={PUBLIC_PAGES.REGISTER}>
							<MoveLeft />
							Назад
						</Link>
					)}
				</div>
			</Container>
		</Section>
	)
}

export default AuthConfirmWrapper
