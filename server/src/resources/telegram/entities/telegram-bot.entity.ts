import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TelegramBot {
	@Field(() => String)
	chatId: string

	@Field(() => String)
	token: string
}
