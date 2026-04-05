import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { Module } from '@nestjs/common'
import { path } from 'app-root-path'
import { MailResolver } from './mail.resolver'
import { MailService } from './mail.service'

@Module({
	providers: [MailResolver, MailService],
	imports: [
		MailerModule.forRoot({
			transport: {
				service: process.env.EMAIL_SERVICE,
				host: process.env.EMAIL_HOST,
				port: parseInt(process.env.EMAIL_PORT),
				ignoreTLS: true,
				secure: true,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
			template: {
				dir: `${path}/src/resources/mail/templates`,
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
})
export class MailModule {}
