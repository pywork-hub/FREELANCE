import { Field, InputType } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { SelectUserRoleInput } from 'src/global/inputs/select.input'
import { UserRole } from '../enums/user-role.enum'
import { TelegramBotInput } from './telegram-bot.input'

@InputType()
export class ProfileInput {
	@Field(() => String)
	login: string

	@Field(() => GraphQLUpload, { nullable: true })
	avatarFile?: FileUpload
}

@InputType()
export class UserInput {
	@Field(() => [TelegramBotInput])
	bots: TelegramBotInput[]

	@Field(() => [SelectUserRoleInput])
	roles: SelectUserRoleInput[]
}
