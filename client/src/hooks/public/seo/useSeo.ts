import {
	PageSeoDocument,
	PageType,
	type PageSeoQuery,
	type PageSeoQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useSeo = async (type: PageType) => {
	const { data, error } = await serverApolloClient.query<
		PageSeoQuery,
		PageSeoQueryVariables
	>({
		query: PageSeoDocument,
		variables: {
			type,
		},
	})

	return {
		seo: data.pageSeo,
		error,
	}
}
