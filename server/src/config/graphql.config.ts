import { ConfigService } from '@nestjs/config'
import { PubSubEngine } from 'graphql-subscriptions'
import { join } from 'path'
import { UserService } from 'src/resources/user/user.service'
import { isDev } from 'src/utils/helpers/is-dev.util'

const disconnectTimers = new Map()

export const getGraphQLConfig = async (
	configService: ConfigService,
	userService: UserService,
	pubSub: PubSubEngine
): Promise<any> => {
	return {
		path: '/api/mygraphql',
		playground: isDev(configService),
		autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
		context: ({ req, res }) => ({
			req,
			res,
		}),
		sortSchema: true,
		subscriptions: {
			'graphql-ws': {
				path: '/api/mygraphql',
				onConnect: async (context) => {
					const userId = context?.connectionParams?.userId
					if (!userId) return

					const lastDisconnectInfo = disconnectTimers.get(userId)
					const currentTime = Date.now()

					if (
						lastDisconnectInfo &&
						currentTime - lastDisconnectInfo.time < 5000
					) {
						clearTimeout(lastDisconnectInfo.timer)
						disconnectTimers.delete(userId)
						return
					}

					const activity = await userService.updateOnline(userId, 'connect')
					await pubSub.publish(`userActivity.${userId}`, { activity })

					return activity
				},
				onDisconnect: async (context) => {
					const userId = context?.connectionParams?.userId
					if (!userId) return

					const timer = setTimeout(async () => {
						const lastDisconnectInfo = disconnectTimers.get(userId)
						if (
							lastDisconnectInfo &&
							Date.now() - lastDisconnectInfo.time >= 5000
						) {
							const activity = await userService.updateOnline(
								userId,
								'disconnect'
							)
							await pubSub.publish(`userActivity.${userId}`, { activity })
						}
						disconnectTimers.delete(userId)
					}, 5000)

					disconnectTimers.set(userId, { timer, time: Date.now() })
				},
			},
		},
	}
}
