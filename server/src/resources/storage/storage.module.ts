import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { StorageResolver } from './storage.resolver'
import { StorageService } from './storage.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${process.env.CDN_EDGE_PREFIX}/uploads`,
			serveRoot: '/uploads',
		}),
	],
	providers: [StorageResolver, StorageService],
})
export class StorageModule {}
