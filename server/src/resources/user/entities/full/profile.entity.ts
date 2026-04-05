import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from './user.entity'

@ObjectType()
export class Profile {
	@Field(() => Int)
	id: number

	@Field(() => String)
	email: string

	@Field(() => String)
	login: string
	
	@Field(() => String)
	avatarPath: string

	@Field(() => User)
	user: User

	@Field(() => Int)
	userId: number

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}