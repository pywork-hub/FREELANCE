import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { getUser } from '@/server/auth/get-server-session'
import type { FC } from 'react'
import styles from './Profile.module.scss'
import ProfileForm from './form/ProfileForm'

const Profile: FC = async () => {
	const user = await getUser()

	if (!user) return null

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.profile}>
					<Heading variant="h2" className={styles.heading}>
						Профиль
					</Heading>
					<ProfileForm profile={user.profile} />
				</div>
			</Container>
		</Section>
	)
}

export default Profile
