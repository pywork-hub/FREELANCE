import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Visibility } from 'src/global/enums/query.enum'
import { Review } from 'src/resources/review/entities/review.entity'
import { Service } from 'src/resources/service/entities/service.entity'
import { User } from 'src/resources/user/entities/full/user.entity'

@ObjectType()
export class Example {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	coverPath: string

	@Field(() => String)
	imagePath: string

	@Field(() => String, { nullable: true })
	url: string

	@Field(() => Service, { nullable: true })
	service?: Service

	@Field(() => User, { nullable: true })
	user?: User

	@Field(() => Review, { nullable: true })
	review?: Review

	@Field(() => Visibility)
	visibility: Visibility

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}

@ObjectType()
export class AllExamples {
	@Field(() => [Example])
	examples: Example[]

	@Field(() => Int)
	count: number
}
