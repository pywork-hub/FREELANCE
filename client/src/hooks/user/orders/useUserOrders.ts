import {
	UserOrdersDocument,
	type QueryInput,
	type UserOrdersQuery,
	type UserOrdersQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'
import { CookieService } from '@/services/cookie/cookie.service'

export const useUserOrders = async (query: QueryInput) => {
	const { context } = CookieService.setCookiesToContext()

	const { data, error } = await serverApolloClient.query<
		UserOrdersQuery,
		UserOrdersQueryVariables
	>({
		query: UserOrdersDocument,
		variables: {
			query,
		},
		context: context,
	})

	return {
		orders: data?.orders || [],
		error,
	}
}
