import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { UserRole } from '../user/enums/user-role.enum'
import { AllRequests, Request } from './entities/request.entity'
import { RequestInput } from './inputs/request.input'
import { RequestService } from './request.service'

@Resolver()
export class RequestResolver {
	constructor(private readonly requestService: RequestService) {}

	@Query(() => AllRequests, { name: 'requests' })
	async getAll(@Args('query') input: QueryInput) {
		return this.requestService.getAll(input)
	}

	@Mutation(() => Request, { name: 'sendRequest' })
	async sendRequest(@Args('data') input: RequestInput) {
		return this.requestService.send(input)
	}

	// Admin Place
	@Auth(UserRole.ADMIN)
	@Query(() => Request, { name: 'requestById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.requestService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Request, { name: 'deleteRequest' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.requestService.delete(id)
	}
}
