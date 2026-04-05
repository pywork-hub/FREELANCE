import { IS_CLIENT, IS_DEVELOPMENT } from '@/constants/global.constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { mainClientLink } from './links/apollo-client.api'
import { mainServerLink } from './links/apollo-server.api'

const removeTypenameFromCache = { addTypename: false }

const clientApolloClient = new ApolloClient({
	link: mainClientLink,
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
		mutate: {
			fetchPolicy: 'no-cache',
		},
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
	},
	cache: new InMemoryCache(removeTypenameFromCache),
	connectToDevTools: IS_DEVELOPMENT,
})

export const serverApolloClient = new ApolloClient({
	link: mainServerLink,
	cache: new InMemoryCache(removeTypenameFromCache),
	connectToDevTools: IS_DEVELOPMENT,
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
		mutate: {
			fetchPolicy: 'no-cache',
		},
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
	},
	ssrMode: true,
})

export function apolloClient() {
	return IS_CLIENT ? clientApolloClient : serverApolloClient
}
