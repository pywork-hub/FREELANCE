import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TelegramBotInput {
	@Field(() => String)
	token: string

	@Field(() => String)
	chatId: string
}