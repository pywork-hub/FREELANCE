import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Request {
	@Field(() => Int)
	id: number

	@Field(() => String)
	firstName: string

	@Field(() => String)
	lastName: string

	@Field(() => String)
	email: string

	@Field(() => String)
	message: string

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class AllRequests {
	@Field(() => [Request])
	requests: Request[]

	@Field(() => Int)
	count: number
}