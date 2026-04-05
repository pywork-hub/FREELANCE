import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SessionUser } from 'src/resources/user/entities/session/user.entity'

@ObjectType()
export class Review {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	rating: number

	@Field(() => String)
	comment: string

	@Field(() => SessionUser)
	user: SessionUser

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class AllReviews {
	@Field(() => [Review])
	reviews: Review[]

	@Field(() => Int)
	count: number
}
