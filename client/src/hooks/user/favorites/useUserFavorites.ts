import {
	UserFavoritesDocument,
	type ServiceQueryInput,
	type UserFavoritesQuery,
	type UserFavoritesQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'
import { CookieService } from '@/services/cookie/cookie.service'

export const useUserFavorites = async (query: ServiceQueryInput) => {
	const { context } = CookieService.setCookiesToContext()

	const { data, error } = await serverApolloClient.query<
		UserFavoritesQuery,
		UserFavoritesQueryVariables
	>({
		query: UserFavoritesDocument,
		variables: {
			query,
		},
		context: context,
	})

	return {
		services: data?.userFavorites.services || [],
		count: data.userFavorites.count || 0,
		error,
	}
}
