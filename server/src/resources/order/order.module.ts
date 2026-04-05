import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TelegramService } from '../telegram/telegram.service'
import { OrderController } from './order.controller'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
	imports: [
		BullModule.forRoot({
			redis: {
				host: process.env.NOTICE_DOMAIN,
				port: +process.env.NOTICE_PORT,
				password: process.env.NOTICE_PASSWORD,
				maxRetriesPerRequest: null,
			},
		}),
		BullModule.registerQueue({
			name: 'order-queue',
			defaultJobOptions: {
				attempts: 2,
			},
		}),
	],
	providers: [OrderResolver, OrderService, TelegramService],
	exports: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
