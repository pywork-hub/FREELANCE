import {
	CurrentRoomDocument,
	Sort,
	type CurrentRoomQuery,
	type CurrentRoomQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'
import { CookieService } from '@/services/cookie/cookie.service'

export const useCurrentRoom = async (partnerLogin?: string) => {
	if (!partnerLogin) return { room: null, error: undefined }

	const { context } = CookieService.setCookiesToContext()

	const { data, error } = await serverApolloClient.query<
		CurrentRoomQuery,
		CurrentRoomQueryVariables
	>({
		query: CurrentRoomDocument,
		variables: {
			partnerLogin,
			query: {
				sort: Sort.Desc,
				page: '1',
				perPage: '50',
			},
		},
		context: context,
	})

	return { room: data?.currentRoom || null, error }
}
