import type { SessionUser, UsersQuery } from '@/__generated__/output'
import type { TypeAuthUser } from '../auth/auth.type'

export type TypeIronUser = {
	user?: TypeAuthUser
}

export type TypeExistUser = {
	user: SessionUser
}

export type TypeUserProfile = SessionUser['profile']

export type TypeUser = UsersQuery['users']['users'][0]
