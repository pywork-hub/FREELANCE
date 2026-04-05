import { Module } from '@nestjs/common'
import { TelegramResolver } from './telegram.resolver'
import { TelegramService } from './telegram.service'

@Module({
	providers: [TelegramResolver, TelegramService],
	exports: [TelegramService],
})
export class TelegramModule {}
