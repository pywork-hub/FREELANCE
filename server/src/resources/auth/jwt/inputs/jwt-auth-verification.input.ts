import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class JwtAuthVerificationInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'E-mail is required.' })
	@IsString({ message: 'E-mail must be a string.' })
	@IsEmail({}, { message: 'Please enter valid E-mail.' })
	readonly email: string
}
