import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PubSubEngine } from 'graphql-subscriptions'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { getGraphQLConfig } from './config/graphql.config'
import { GlobalModule } from './global/module/global.module'
import { AnalyticsModule } from './resources/analytics/analytics.module'
import { AttributeModule } from './resources/attribute/attribute.module'
import { AuthModule } from './resources/auth/auth.module'
import { CatalogModule } from './resources/catalog/catalog.module'
import { CategoryModule } from './resources/category/category.module'
import { ExampleModule } from './resources/example/example.module'
import { MessageModule } from './resources/message/message.module'
import { OrderModule } from './resources/order/order.module'
import { PageModule } from './resources/page/page.module'
import { PaginationModule } from './resources/pagination/pagination.module'
import { RequestModule } from './resources/request/request.module'
import { ReviewModule } from './resources/review/review.module'
import { RoomModule } from './resources/room/room.module'
import { ServiceModule } from './resources/service/service.module'
import { StorageModule } from './resources/storage/storage.module'
import { TelegramModule } from './resources/telegram/telegram.module'
import { UserModule } from './resources/user/user.module'
import { UserService } from './resources/user/user.service'
import { MailModule } from './resources/mail/mail.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule, UserModule],
			useFactory: async (
				configService: ConfigService,
				userService: UserService,
				pubSub: PubSubEngine
			) => {
				return getGraphQLConfig(configService, userService, pubSub)
			},
			inject: [ConfigService, UserService, 'PUB_SUB'],
		}),
		GlobalModule,
		UserModule,
		AuthModule,
		PaginationModule,
		StorageModule,
		CategoryModule,
		ServiceModule,
		ExampleModule,
		RoomModule,
		MessageModule,
		AttributeModule,
		CatalogModule,
		OrderModule,
		TelegramModule,
		AnalyticsModule,
		RequestModule,
		ReviewModule,
		PageModule,
		MailModule,
	],
	providers: [AppService, AppResolver],
})
export class AppModule {}
