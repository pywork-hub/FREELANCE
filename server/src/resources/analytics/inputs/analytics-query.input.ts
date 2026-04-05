import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@InputType()
export class AnalyticsQueryInput {
	@Field(() => String)
	@IsBoolean({ message: 'Duration must be a boolean.' })
	duration: '1h' | '1d' | '1w' | '1m' | '1y' | 'all'
}
