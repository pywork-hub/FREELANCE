import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Typing {
	@Field(() => Boolean)
	isPartnerTyping: boolean
}
