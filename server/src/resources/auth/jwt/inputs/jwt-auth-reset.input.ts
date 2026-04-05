import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class JwtAuthResetInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Token is required.' })
	@IsString({ message: 'Token must be a string.' })
	readonly token: string

	@Field(() => String)
	@IsNotEmpty({ message: 'New Password is required.' })
	@IsString({ message: 'New Password must be a string.' })
	readonly newPassword: string
}
