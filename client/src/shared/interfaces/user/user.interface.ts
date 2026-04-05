import type { Activity } from '@/__generated__/output'
import type { TypeUser, TypeUserProfile } from '@/shared/types/user/user.type'

export interface IUserProfile {
	profile: TypeUserProfile
}

export interface IUser {
	user: TypeUser
}

export interface IUserId {
	userId: number
}

export interface IUserActivity {
	activity: Activity
}
