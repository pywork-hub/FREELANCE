import { Inject } from '@nestjs/common'
import {
	Args,
	Int,
	Mutation,
	Query,
	Resolver,
	Subscription,
} from '@nestjs/graphql'
import { PubSubEngine } from 'graphql-subscriptions'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { SessionUserResponse } from '../auth/helpers/entities/session-user-response.entity'
import { AllServices } from '../service/entities/service.entity'
import { ServiceQueryInput } from '../service/inputs/service-query.input'
import { CurrentUser } from './decorators/user.decorator'
import { Activity } from './entities/activity/activity.entity'
import { AllUsers, User } from './entities/full/user.entity'
import { UserRole } from './enums/user-role.enum'
import { ProfileInput, UserInput } from './inputs/user.input'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		@Inject('PUB_SUB') private readonly pubSub: PubSubEngine
	) {}

	@Auth(UserRole.ADMIN)
	@Query(() => AllUsers, { name: 'users' })
	async getAll(@Args('query') input: QueryInput) {
		return this.userService.getAll(input)
	}

	@Auth(UserRole.MANAGER)
	@Query(() => [User], { name: 'otherManagers' })
	async getOtherManagers(@CurrentUser('id') id: number) {
		return this.userService.getOtherManagers(id)
	}

	@Auth()
	@Query(() => AllServices, { name: 'userFavorites' })
	async getUserFavorites(
		@CurrentUser('id') id: number,
		@Args('query') input: ServiceQueryInput
	) {
		return this.userService.getFavorites(id, input)
	}

	@Auth()
	@Mutation(() => SessionUserResponse, { name: 'toggleFavorite' })
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Args('serviceSlug') serviceSlug: string
	) {
		return this.userService.toggleFavorite(id, serviceSlug)
	}

	@Auth()
	@Mutation(() => SessionUserResponse, { name: 'updateProfile' })
	async updateProfile(
		@CurrentUser('id') id: number,
		@Args('data') input: ProfileInput
	) {
		return this.userService.updateProfile(id, input)
	}

	@Subscription(() => Activity, {
		nullable: true,
		name: 'userActivity',
		resolve: (value) => {
			return value.activity
		},
	})
	async userActivity(@Args('userId', { type: () => Int }) userId: number) {
		return this.pubSub.asyncIterator(`userActivity.${userId}`)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => User, { name: 'userById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.userService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => User, { name: 'updateUser' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UserInput
	) {
		return this.userService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => User, { name: 'deleteUser' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.userService.delete(id)
	}
}
