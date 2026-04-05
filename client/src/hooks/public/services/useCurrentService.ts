import {
	CurrentServiceDocument,
	type CurrentServiceQuery,
	type CurrentServiceQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'
import { CookieService } from '@/services/cookie/cookie.service'

export const useCurrentService = async (slug?: string) => {
	if (!slug) return { service: null, error: undefined }

	const { context } = CookieService.setCookiesToContext()

	const { data, error } = await serverApolloClient.query<
		CurrentServiceQuery,
		CurrentServiceQueryVariables
	>({
		query: CurrentServiceDocument,
		variables: {
			slug,
		},
		context: context,
	})

	return {
		service: data?.currentService?.service || null,
		similarServices: data.currentService?.similarServices || [],
		reviewsCount: data.currentService?.reviewsCount || 0,
		error,
	}
}
