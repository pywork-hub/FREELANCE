import {
	ServicesDocument,
	type ServiceQueryInput,
	type ServicesQuery,
	type ServicesQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useServices = async (query: ServiceQueryInput) => {
	const { data, error } = await serverApolloClient.query<
		ServicesQuery,
		ServicesQueryVariables
	>({
		query: ServicesDocument,
		variables: {
			query,
		},
	})

	return {
		services: data?.services.services || [],
		count: data.services.count || 0,
		error,
	}
}
