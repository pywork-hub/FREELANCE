import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, type JwtModuleAsyncOptions } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthModule } from 'src/resources/auth/auth.module'
import { AuthService } from 'src/resources/auth/auth.service'
import { JwtStrategy } from 'src/resources/auth/helpers/strategies/jwt.strategy'
import { PaginationService } from 'src/resources/pagination/pagination.service'
import { ServiceService } from 'src/resources/service/service.service'
import { TelegramService } from 'src/resources/telegram/telegram.service'
import { UserService } from 'src/resources/user/user.service'

const jwtModuleOptions: JwtModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: getJwtConfig,
}

@Global()
@Module({
	providers: [
		AuthService,
		JwtStrategy,
		UserService,
		ServiceService,
		PrismaService,
		PaginationService,
		TelegramService,
	],
	imports: [
		ConfigModule,
		JwtModule.registerAsync(jwtModuleOptions),
		AuthModule,
	],
	exports: [
		AuthService,
		JwtStrategy,
		UserService,
		ServiceService,
		PrismaService,
		PaginationService,
		ConfigModule,
		JwtModule,
		AuthModule,
		TelegramService,
	],
})
export class GlobalModule {}
