import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreatePaymentInput {
	@Field(() => Int)
	@IsNotEmpty({ message: 'Total is required.' })
	@IsNumber({}, { message: 'Total must be a number.' })
	total: number

	@Field(() => String)
	@IsNotEmpty({ message: 'Redirect Url is required.' })
	@IsString({ message: 'Redirect Url must be a string.' })
	redirectUrl: string
}

@InputType()
class PaymentCaptureAmountInput {
	@Field(() => String)
	value: string

	@Field(() => String)
	currency: string
}

@InputType()
class PaymentCaptureCardInput {
	@Field(() => String)
	first6: string

	@Field(() => String)
	last4: string

	@Field(() => String)
	expiry_month: string

	@Field(() => String)
	expiry_year: string

	@Field(() => String)
	card_type: string

	@Field(() => String)
	issuer_country: string
}

@InputType()
class PaymentCaptureMethodInput {
	@Field(() => String)
	type: string

	@Field(() => Int)
	id: number

	@Field(() => Boolean)
	saved: boolean

	@Field(() => String)
	title: string

	@Field(() => PaymentCaptureCardInput)
	card: PaymentCaptureCardInput
}

@InputType()
export class PaymentCaptureObjectInput {
	@Field(() => String)
	id: string

	@Field(() => String)
	status: string

	@Field(() => PaymentCaptureAmountInput)
	amount: PaymentCaptureAmountInput

	@Field(() => String)
	description: string

	@Field(() => PaymentCaptureMethodInput)
	payment_method: PaymentCaptureMethodInput

	@Field(() => String)
	created_at: string

	@Field(() => String)
	expires_at: string
}

@InputType()
export class PaymentCaptureInput {
	@Field(() => String)
	event:
		| 'payment.succeeded'
		| 'payment.waiting_for_capture'
		| 'payment.canceled'
		| 'refund.succeeded'

	@Field(() => String)
	type: string

	@Field(() => PaymentCaptureObjectInput)
	object: PaymentCaptureObjectInput
}
