import { Field, InputType } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { CreatableSelectInput } from 'src/global/inputs/select.input'

@InputType()
export class NewsletterInput {
	@Field(() => [CreatableSelectInput], { nullable: true })
	emails?: CreatableSelectInput[]

	@Field(() => String)
	subject: string

	@Field(() => GraphQLUpload)
	file: FileUpload
}
