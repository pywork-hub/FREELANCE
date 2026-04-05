import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'

@InputType()
export class UploadFilesInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Folder Path is required.' })
	@IsString({ message: 'Folder Path must be a string.' })
	folderPath: string

	@Field(() => [GraphQLUpload])
	data: FileUpload[]
}
