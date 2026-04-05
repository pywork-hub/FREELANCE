import { Injectable } from '@nestjs/common'
import { fromTelegramMessageFormat } from 'src/utils/formats/format-telegram-message.util'
import { Telegraf } from 'telegraf'
import type { ITelegramBot } from './interface/telegram.interface'

@Injectable()
export class TelegramService {
	async sendTelegramNotification(
		bots: ITelegramBot[],
		message: string,
		partnerLogin: string
	) {
		bots.map(async ({ chatId, token }) => {
			const bot = new Telegraf(token)

			await bot.telegram.sendMessage(
				chatId,
				fromTelegramMessageFormat(message),
				{
					parse_mode: 'HTML',
					reply_markup: {
						inline_keyboard: [
							[
								{
									url: `${process.env.REACT_APP_URL}/chat/${partnerLogin}`,
									text: '💼 Go to chat',
								},
							],
						],
					},
				}
			)
		})
	}
}
