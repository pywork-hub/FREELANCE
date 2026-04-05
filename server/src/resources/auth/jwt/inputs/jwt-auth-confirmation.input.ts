import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class JwtAuthConfirmationInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'E-mail is required.' })
	@IsString({ message: 'E-mail must be a string.' })
	@IsEmail({}, { message: 'Please write valid E-mail.' })
	readonly email: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Login is required.' })
	@MinLength(5, { message: 'Min length must be at least 5 characters' })
	@IsString({ message: 'Login must be a string.' })
	readonly login: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Password is required.' })
	@MinLength(5, { message: 'Min length must be at least 6 characters' })
	@IsString({ message: 'Password must be a string.' })
	readonly password: string
}
