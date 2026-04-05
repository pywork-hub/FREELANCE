import {
	Sort,
	UserRoomsDocument,
	type UserRoomsQuery,
	type UserRoomsQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'
import { CookieService } from '@/services/cookie/cookie.service'

export const useUserRooms = async () => {
	const { context } = CookieService.setCookiesToContext()

	const { data, error } = await serverApolloClient.query<
		UserRoomsQuery,
		UserRoomsQueryVariables
	>({
		query: UserRoomsDocument,
		variables: {
			query: {
				sort: Sort.Desc,
			},
		},
		context: context,
	})

	return { rooms: data?.userRooms || [], error }
}
