import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	providers: [
		UserResolver,
		UserService,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
	exports: ['PUB_SUB'],
})
export class UserModule {}
