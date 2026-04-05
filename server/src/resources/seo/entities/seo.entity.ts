import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class OpenGraphsImage {
	@Field(() => String)
	url: string

	@Field(() => String)
	alt: string
}

@ObjectType()
export class OpenGraphs {
	@Field(() => String)
	title: string

	@Field(() => String)
	description: string

	@Field(() => [OpenGraphsImage])
	images: OpenGraphsImage[]
}

@ObjectType()
export class Seo {
	@Field(() => String)
	title: string

	@Field(() => String)
	description: string

	@Field(() => [String])
	keywords: string[]

	@Field(() => OpenGraphs, { nullable: true })
	graphs?: OpenGraphs
}
