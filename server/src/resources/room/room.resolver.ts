import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/helpers/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { User } from '../user/entities/full/user.entity'
import { UserRole } from '../user/enums/user-role.enum'
import { CurrentRoom, UserRoom } from './entities/user-rooms.entity'
import { ChangeRoomManagerInput } from './inputs/change-room-manager.input'
import { RoomService } from './room.service'

@Resolver()
export class RoomResolver {
	constructor(private readonly roomService: RoomService) {}

	@Auth()
	@Query(() => [UserRoom], { name: 'userRooms' })
	async getAll(
		@CurrentUser('id') id: number,
		@Args('query') input: QueryInput
	) {
		return this.roomService.getAll(id, input)
	}

	@Auth()
	@Query(() => CurrentRoom, { name: 'currentRoom', nullable: true })
	async getRoomByPartner(
		@CurrentUser() user: User,
		@Args('partnerLogin', { type: () => String }) partnerLogin: string,
		@Args('query') input: QueryInput
	) {
		return this.roomService.byPartnerLogin(
			user.profile.login,
			partnerLogin,
			input
		)
	}

	@Auth(UserRole.MANAGER)
	@Mutation(() => Boolean, { name: 'changeRoomManager' })
	async changeRoomManager(
		@CurrentUser('id') id: number,
		@Args('data') input: ChangeRoomManagerInput
	) {
		try {
			return this.roomService.changeManager(id, input)
		} catch (err) {
			return false
		}
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Boolean, { name: 'deleteRoom' })
	async delete(@Args('roomId', { type: () => Int }) roomId: number) {
		try {
			await this.roomService.delete(roomId)
			return true
		} catch (e) {
			return false
		}
	}
}
