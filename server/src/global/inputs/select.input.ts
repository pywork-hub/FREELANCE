import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { UserRole } from 'src/resources/user/enums/user-role.enum'

@InputType()
export class SelectInput {
	@Field(() => Int)
	@IsNumber({}, { message: 'Value must be a number.' })
	@IsNotEmpty({ message: 'Value is required.' })
	value: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string
}

@InputType()
export class CreatableSelectInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Value is required.' })
	@IsString({ message: 'Value must be a string.' })
	value: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string
}

@InputType()
export class SelectUserRoleInput {
	@Field(() => String)
	@IsString({ message: 'User Role must be a number.' })
	@IsNotEmpty({ message: 'User Role is required.' })
	value: UserRole

	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: UserRole
}
