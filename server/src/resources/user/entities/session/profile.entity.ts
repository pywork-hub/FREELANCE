import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SessionProfile {
	@Field(() => String)
	email: string

	@Field(() => String)
	login: string

	@Field(() => String)
	avatarPath: string
}
