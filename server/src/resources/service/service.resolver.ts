import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { UserRole } from '../user/enums/user-role.enum'
import { AllServices, CurrentService, Service } from './entities/service.entity'
import { ServiceQueryInput } from './inputs/service-query.input'
import { ServiceInput } from './inputs/service.input'
import { ServiceService } from './service.service'

@Resolver()
export class ServiceResolver {
	constructor(private readonly serviceService: ServiceService) {}

	@Query(() => AllServices, { name: 'services' })
	async getAll(
		@Args('query') input: ServiceQueryInput,
		@Args('categorySlug', { nullable: true }) categorySlug: string
	) {
		return this.serviceService.getAll(
			input,
			categorySlug
				? {
						categories: { some: { slug: categorySlug } },
					}
				: undefined
		)
	}

	@Query(() => CurrentService, { name: 'currentService' })
	async getBySlug(@Args('slug') slug: string) {
		return this.serviceService.bySlug(slug)
	}

	// Admin Place
	@Auth(UserRole.ADMIN)
	@Query(() => Service, { name: 'serviceById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'toggleService' })
	async toggleVisibility(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.toggleVisibility(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'duplicateService' })
	async duplicate(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.duplicate(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'createService' })
	async create() {
		return this.serviceService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'updateService' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: ServiceInput
	) {
		return this.serviceService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'deleteService' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.delete(id)
	}
}
