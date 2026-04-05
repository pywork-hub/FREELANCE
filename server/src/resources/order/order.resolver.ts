import { Args, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { Order } from './entities/orders.entity'
import { OrderService } from './order.service'

@Resolver()
export class OrderResolver {
	constructor(private readonly orderService: OrderService) {}

	@Auth()
	@Query(() => [Order], { name: 'orders' })
	async getAll(
		@CurrentUser('id') id: number,
		@Args('query') input: QueryInput
	) {
		return this.orderService.getAll(id, input)
	}
}
