import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PaymentCaptureInput } from './inputs/payment.input'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	// @Auth()
	@HttpCode(200)
	@Post('status')
	async updateOrderStatus(@Body() input: PaymentCaptureInput) {
		if (input.event === 'payment.waiting_for_capture') {
			const status = input.object.status

			if (status === 'waiting_for_capture') {
				const paymentId = input.object.id
				
				return this.orderService.placeOrder(input)
			}
		}
	}
}
