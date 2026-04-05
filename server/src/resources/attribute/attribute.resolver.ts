import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { UserRole } from '../user/enums/user-role.enum'
import { AttributeService } from './attribute.service'
import { AllAttributes, Attribute } from './entities/attribute.entity'
import { Property } from './entities/property.entity'
import { AttributeInput } from './inputs/attribute.input'

@Resolver()
export class AttributeResolver {
	constructor(private readonly attributeService: AttributeService) {}

	// Admin Place
	@Auth(UserRole.ADMIN)
	@Query(() => AllAttributes, { name: 'attributes' })
	async getAll(@Args('query') input: QueryInput) {
		return this.attributeService.getAll(input)
	}

	@Auth(UserRole.ADMIN)
	@Query(() => [Property], { name: 'properties' })
	async getAllProperties() {
		return this.attributeService.getAllProperties()
	}

	@Auth(UserRole.ADMIN)
	@Query(() => Attribute, { name: 'attributeById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.attributeService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Attribute, { name: 'duplicateAttribute' })
	async duplicate(@Args('id', { type: () => Int }) id: number) {
		return this.attributeService.duplicate(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Attribute, { name: 'createAttribute' })
	async create() {
		return this.attributeService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Attribute, { name: 'updateAttribute' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: AttributeInput
	) {
		return this.attributeService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Attribute, { name: 'deleteAttribute' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.attributeService.delete(id)
	}
}
