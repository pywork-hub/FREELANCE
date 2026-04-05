import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import type { FC } from 'react'
import styles from './Auth.module.scss'
import AuthForm from './form/AuthForm'

const Auth: FC = () => {
	return (
		<Section className={styles.section}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.fill}>
						<AuthForm />
					</div>
				</div>
			</Container>
		</Section>
	)
}

export default Auth
