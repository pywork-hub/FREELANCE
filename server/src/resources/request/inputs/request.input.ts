import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RequestInput {
	@Field(() => String)
	firstName: string

	@Field(() => String)
	lastName: string

	@Field(() => String)
	email: string

	@Field(() => String)
	message: string
}
