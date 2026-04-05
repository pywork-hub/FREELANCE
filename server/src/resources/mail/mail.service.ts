import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, NotFoundException } from '@nestjs/common'
import { path } from 'app-root-path'
import { unlink, writeFile } from 'fs-extra'
import * as html2pug from 'html2pug'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserRole } from '../user/enums/user-role.enum'
import { MailInput } from './inputs/mail.input'
import { NewsletterInput } from './inputs/newsletter.input'

@Injectable()
export class MailService {
	constructor(
		private readonly emailService: MailerService,
		private readonly prisma: PrismaService
	) {}

	async sendEmail(input: MailInput, context?: object) {
		const { subject, email, template } = input

		await this.emailService.sendMail({
			from: process.env.SITE_NAME,
			to: email,
			subject,
			template,
			context,
		})

		return true
	}

	async sendNewsletter(input: NewsletterInput) {
		const { subject, emails, file } = input

		const finallyEmails =
			emails && emails.length > 0
				? emails.map((email) => email.value)
				: (
						await this.prisma.user.findMany({
							where: {
								NOT: [
									{
										roles: {
											has: UserRole.ADMIN,
										},
									},
									{
										roles: {
											has: UserRole.MANAGER,
										},
									},
								],
							},
							select: {
								profile: {
									select: {
										email: true,
									},
								},
							},
						})
					).map((user) => user.profile.email)

		if (finallyEmails.length === 0)
			throw new NotFoundException('Нет ни одного пользователя.')

		const { createReadStream } = await Promise.resolve(file)
		const stream = createReadStream()
		const chunks: Buffer[] = []

		for await (let chunk of stream) {
			chunks.push(chunk)
		}

		const html = Buffer.concat(chunks).toString('utf8')
		const pug = html2pug(html, { tabs: true })

		const filename = `newsletter-${Date.now()}.pug`
		const filePath = `${path}/src/resources/mail/templates/${filename}`

		try {
			await writeFile(filePath, pug, 'utf8')

			await this.emailService.sendMail({
				from: process.env.SITE_NAME,
				to: finallyEmails,
				subject,
				template: filePath,
			})

			await unlink(filePath)
			return true
		} catch (error) {
			console.log(error)
			await unlink(filePath)
			return false
		}
	}
}
