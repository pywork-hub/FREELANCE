import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { OrderModule } from '../order/order.module'
import { MessageResolver } from './message.resolver'
import { MessageService } from './message.service'
import { BullModule } from '@nestjs/bull'

@Module({
	imports: [
		OrderModule,
		BullModule.registerQueue({
			name: 'order-queue',
			defaultJobOptions: {
				attempts: 2,
			},
		}),
	],
	providers: [
		MessageResolver,
		MessageService,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
	exports: ['PUB_SUB'],
})
export class MessageModule {}
