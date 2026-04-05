import { Field, Int, ObjectType } from '@nestjs/graphql'
import { FavoriteService } from 'src/resources/service/entities/service.entity'
import { UserRole } from '../../enums/user-role.enum'
import { SessionProfile } from './profile.entity'

@ObjectType()
export class SessionUser {
	@Field(() => Int)
	id: number

	@Field(() => SessionProfile)
	profile: SessionProfile

	@Field(() => [FavoriteService])
	favorites: FavoriteService[]

	@Field(() => [UserRole])
	roles: UserRole[]
}
