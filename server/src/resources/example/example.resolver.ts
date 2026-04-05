import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryFullestInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { UserRole } from '../user/enums/user-role.enum'
import { AllExamples, Example } from './entities/example.entity'
import { ExampleService } from './example.service'
import { AddExampleInput, ExampleInput } from './inputs/example.input'

@Resolver()
export class ExampleResolver {
	constructor(private readonly exampleService: ExampleService) {}

	@Query(() => AllExamples, { name: 'examples' })
	async getAll(@Args('query') input: QueryFullestInput) {
		return this.exampleService.getAll(input)
	}

	@Auth(UserRole.MANAGER)
	@Mutation(() => Example, { name: 'addExample' })
	async addExample(@Args('data') input: AddExampleInput) {
		return this.exampleService.addExample(input)
	}

	// Admin Place
	@Auth(UserRole.ADMIN)
	@Query(() => Example, { name: 'exampleById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.exampleService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Example, { name: 'toggleExample' })
	async toggleVisibility(@Args('id', { type: () => Int }) id: number) {
		return this.exampleService.toggleVisibility(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Example, { name: 'duplicateExample' })
	async duplicate(@Args('id', { type: () => Int }) id: number) {
		return this.exampleService.duplicate(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Example, { name: 'createExample' })
	async create() {
		return this.exampleService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Example, { name: 'updateExample' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: ExampleInput
	) {
		return this.exampleService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Example, { name: 'deleteExample' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.exampleService.delete(id)
	}
}
