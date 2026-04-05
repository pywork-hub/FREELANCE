import { EnumCookies } from '@/constants/cookies.constants'
import { IS_PRODUCTION } from '@/constants/global.constants'
import type { TypeAuthUser } from '@/shared/types/auth/auth.type'
import {
	getIronSession,
	getServerActionIronSession,
	type IronSessionData,
	type IronSessionOptions,
} from 'iron-session'
import { cookies } from 'next/headers'

export const sessionOptions: IronSessionOptions = {
	password: process.env.IRON_PASSWORD as string,
	cookieName: EnumCookies.SESSION,
	cookieOptions: {
		secure: IS_PRODUCTION,
		sameSite: 'strict',
	},
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: TypeAuthUser
	}
}

const getSession = async (req: Request, res: Response) => {
	const session = getIronSession<IronSessionData>(req, res, sessionOptions)
	return session
}

const getServerActionSession = async () => {
	const session = getServerActionIronSession<IronSessionData>(
		sessionOptions,
		cookies()
	)
	return session
}

export { getServerActionSession, getSession }
