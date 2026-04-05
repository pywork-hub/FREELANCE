import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateFolderInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required.' })
	@IsString({ message: 'Name must be a string.' })
	name: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Folder Path is required.' })
	@IsString({ message: 'Folder Path must be a string.' })
	folderPath: string
}
