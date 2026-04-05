import Container from '@/components/ui/common/container/Container'
import Section from '@/components/ui/common/section/Section'
import Heading from '@/components/ui/elements/heading/Heading'
import { getUser } from '@/server/auth/get-server-session'
import type { FC } from 'react'
import styles from './Contact.module.scss'
import ContactForm from './form/ContactForm'

const Contact: FC = async () => {
	const user = await getUser()

	return (
		<Section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<Heading variant="h1" className={styles.heading}>
						Свяжитесь с нами
					</Heading>
					<p className={styles.description}>
						Если у вас есть вопросы о конкретном продукте, пожалуйста, нажмите
						на кнопку <span>Заказать услугу</span>, расположенную внизу карточки
						услуги, и вы будете перенаправлены в чат с нашим менеджером, где вы
						сможете обсудить все детали. Для любых других вопросов, пожалуйста,
						напишите нам здесь, и мы ответим вам на указанный вами или
						зарегистрированный email.
					</p>
					<ContactForm user={user} />
				</div>
			</Container>
		</Section>
	)
}

export default Contact
