import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class JwtAuthLoginInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Login or E-mail is required.' })
	@MinLength(5, { message: 'Min length must be at least 5 characters' })
	@IsString({ message: 'Login or E-mail must be a string.' })
	readonly loginOrEmail: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Password is required.' })
	@MinLength(5, { message: 'Min length must be at least 6 characters' })
	@IsString({ message: 'Password must be a string.' })
	readonly password: string
}
