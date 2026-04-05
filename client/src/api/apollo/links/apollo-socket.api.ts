import { GRAPHQL_SERVER_URL, IS_PRODUCTION } from '@/constants/global.constants'
import { getUser } from '@/server/auth/get-server-session'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const url = new URL(GRAPHQL_SERVER_URL)

export const wsLink = new GraphQLWsLink(
	createClient({
		url: `${IS_PRODUCTION ? 'wss' : 'ws'}://${url.hostname}:${
			url.port
		}/api/mygraphql`,
		keepAlive: 86400000,
		retryAttempts: 10,
		connectionParams: async () => {
			const user = await getUser()

			return {
				userId: user?.id || null,
			}
		},
	})
)
