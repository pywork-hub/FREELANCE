import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BlockItem {
	@Field(() => String, { nullable: true })
	heading?: string

	@Field(() => String)
	content: string
}

@ObjectType()
export class Block {
	@Field(() => String, { nullable: true })
	heading?: string

	@Field(() => [BlockItem])
	items: BlockItem[]
}
