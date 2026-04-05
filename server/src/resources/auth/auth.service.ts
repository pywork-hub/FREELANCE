import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import {
	EXPIRE_DAY_REFRESH_TOKEN,
	EXPIRE_MINUTE_ACCESS_TOKEN,
} from 'src/global/constants/auth.constants'
import { EnumCookies } from 'src/global/enums/cookies.enum'
import { PrismaService } from 'src/prisma/prisma.service'
import { isProd } from 'src/utils/helpers/is-prod.util'
import { sessionUserSelect } from '../user/selects/session-user.select'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService
	) {}

	async logout(res: Response) {
		try {
			await this.removeRefreshTokenFromCookies(res)
			await this.removeAccessTokenFromCookies(res)

			return true
		} catch (err) {
			return false
		}
	}

	async getNewTokens(refreshToken: string, res: Response) {
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) {
			await this.logout(res)
			throw new UnauthorizedException('Logout')
		}

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id,
			},
			select: sessionUserSelect,
		})
		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens,
		}
	}

	async issueTokens(userId: number) {
		const data = { id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: `${EXPIRE_DAY_REFRESH_TOKEN}d`,
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: `${EXPIRE_MINUTE_ACCESS_TOKEN}m`,
		})

		return { accessToken, refreshToken }
	}

	async addRefreshTokenToCookies(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(EnumCookies.REFRESH_TOKEN, refreshToken, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			expires: expiresIn,
			path: '/',
			secure: isProd(this.configService),
			sameSite: 'none',
		})
	}

	async removeRefreshTokenFromCookies(res: Response) {
		res.clearCookie(EnumCookies.REFRESH_TOKEN)
	}

	async addAccessTokenToCookies(res: Response, accessToken: string) {
		const expiresIn = new Date()
		expiresIn.setTime(
			expiresIn.getTime() + EXPIRE_MINUTE_ACCESS_TOKEN * 60 * 1000
		)

		res.cookie(EnumCookies.ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			expires: expiresIn,
			secure: isProd(this.configService),
			path: '/',
			sameSite: 'none',
		})
	}

	async removeAccessTokenFromCookies(res: Response) {
		res.clearCookie(EnumCookies.ACCESS_TOKEN)
	}

	async getUserFromToken(accessToken: string) {
		const result = await this.jwtService.verifyAsync(accessToken)
		return this.prisma.user.findUnique({
			where: {
				id: result.id,
			},
		})
	}
}
