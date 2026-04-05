import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { NewsletterInput } from './inputs/newsletter.input'
import { MailService } from './mail.service'

@Resolver()
export class MailResolver {
	constructor(private readonly mailService: MailService) {}

	@Mutation(() => Boolean, { name: 'sendNewsletter' })
	async sendNewsletter(@Args('data') input: NewsletterInput) {
		return this.mailService.sendNewsletter(input)
	}
}
