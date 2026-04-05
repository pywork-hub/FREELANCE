import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailService } from 'src/resources/mail/mail.service'
import { userInclude } from 'src/resources/user/includes/user.include'
import { sessionUserSelect } from 'src/resources/user/selects/session-user.select'
import { AuthService } from '../auth.service'
import { JwtAuthConfirmationInput } from './inputs/jwt-auth-confirmation.input'
import { JwtAuthLoginInput } from './inputs/jwt-auth-login.input'
import { JwtAuthResetInput } from './inputs/jwt-auth-reset.input'
import { JwtAuthVerificationInput } from './inputs/jwt-auth-verification.input'

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authService: AuthService,
		private readonly mailService: MailService,
		private readonly jwtService: JwtService
	) {}

	async sendConfirmation(input: JwtAuthConfirmationInput) {
		await this.checkUser(input)

		const confirmationToken = await this.jwtService.signAsync(input, {
			expiresIn: `5m`,
		})

		await this.mailService.sendEmail(
			{
				email: input.email,
				subject: `Подтверждения аккаунта`,
				template: 'confirmation.pug',
			},
			{
				url: process.env.REACT_APP_URL,
				token: confirmationToken,
			}
		)

		return true
	}

	async sendVerification(input: JwtAuthVerificationInput) {
		const verificationToken = await this.jwtService.signAsync(input, {
			expiresIn: `5m`,
		})

		await this.mailService.sendEmail(
			{
				email: input.email,
				subject: `Сбросить пароль`,
				template: 'verification.pug',
			},
			{
				url: process.env.REACT_APP_URL,
				token: verificationToken,
			}
		)

		return true
	}

	async reset(input: JwtAuthResetInput) {
		const result = await this.jwtService.verifyAsync(input.token)

		if (!result)
			throw new BadRequestException('Токен истек или недействителен.')

		const user = await this.prisma.user.findFirst({
			where: {
				profile: {
					email: result.email,
				},
			},
		})

		await this.prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				profile: {
					update: {
						password: await hash(input.newPassword),
					},
				},
			},
			include: userInclude,
		})

		return true
	}

	async register(token: string) {
		if (!token) throw new NotFoundException('Токен не найден.')

		const input = await this.jwtService.verifyAsync(token)

		if (!input) throw new BadRequestException('Токен истек или недействителен.')

		await this.checkUser(input)

		const newUser = await this.prisma.user.create({
			data: {
				profile: {
					create: {
						email: input.email,
						login: input.login,
						password: await hash(input.password),
					},
				},
				activity: {
					create: {},
				},
			},
			include: userInclude,
		})

		const tokens = await this.authService.issueTokens(newUser.id)

		return {
			user: newUser,
			...tokens,
		}
	}

	async login(input: JwtAuthLoginInput) {
		const user = await this.prisma.user.findFirst({
			where: {
				profile: {
					OR: [
						{
							email: input.loginOrEmail,
						},
						{
							login: input.loginOrEmail,
						},
					],
				},
			},
			select: sessionUserSelect,
		})

		if (!user) throw new BadRequestException('Пользователь не найден.')

		const isValidPassword = await verify(user.profile.password, input.password)
		if (!isValidPassword)
			throw new BadRequestException('Пользователь не найден.')
		const tokens = await this.authService.issueTokens(user.id)

		return {
			user,
			...tokens,
		}
	}

	async checkUser(input: JwtAuthConfirmationInput) {
		const oldUser = await this.prisma.user.findFirst({
			where: {
				profile: {
					OR: [
						{
							email: input.email,
						},
						{
							login: input.login,
						},
					],
				},
			},
		})

		if (oldUser)
			throw new BadRequestException(
				'Пользователь с таким логином или E-mail уже зарегистрирован.'
			)
	}
}
