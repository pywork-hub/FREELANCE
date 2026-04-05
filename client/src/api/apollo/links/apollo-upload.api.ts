import { GRAPHQL_SERVER_URL } from '@/constants/global.constants'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

export const uploadLink = createUploadLink({
	uri: GRAPHQL_SERVER_URL,
	headers: {
		'apollo-require-preflight': 'true',
	},
	credentials: 'include',
})
