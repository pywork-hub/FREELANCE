import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtAuthModule } from './jwt/jwt-auth.module'

@Module({
	providers: [AuthResolver, AuthService],
	imports: [JwtAuthModule],
})
export class AuthModule {}
