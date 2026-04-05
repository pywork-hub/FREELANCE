'use server'

import type { SessionUser } from '@/__generated__/output'
import { getServerActionSession, sessionOptions } from '@/libs/iron-session.lib'
import type { TypeAuthUser } from '@/shared/types/auth/auth.type'
import { getServerActionIronSession, type IronSessionData } from 'iron-session'
import { cookies } from 'next/headers'

export const getUser = async () => {
	const { user } = await getServerActionSession()

	return user
}

export const getExistUser = async () => {
	const { user } = await getServerActionSession()

	return user as SessionUser
}

export const setServerSession = async (user: TypeAuthUser) => {
	const session = await getServerActionSession()
	session.user = user

	await session.save()
}

export const destroySession = async () => {
	const { destroy } = await getServerActionIronSession<IronSessionData>(
		sessionOptions,
		cookies()
	)

	await destroy()
}
