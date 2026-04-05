import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Review } from 'src/resources/review/entities/review.entity'
import { TelegramBot } from 'src/resources/telegram/entities/telegram-bot.entity'
import { UserRole } from '../../enums/user-role.enum'
import { Profile } from './profile.entity'

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field(() => Profile)
	profile: Profile

	@Field(() => [Review], { nullable: true })
	reviews?: Review[]

	@Field(() => [UserRole])
	roles: UserRole[]

	@Field(() => [TelegramBot])
	bots: TelegramBot[]

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class AllUsers {
	@Field(() => [User])
	users: User[]

	@Field(() => Int)
	count: number
}
