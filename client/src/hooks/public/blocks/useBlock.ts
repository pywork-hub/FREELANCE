import {
	PageBlockDocument,
	PageType,
	type PageBlockQuery,
	type PageBlockQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useBlock = async (type: PageType) => {
	const { data, error } = await serverApolloClient.query<
		PageBlockQuery,
		PageBlockQueryVariables
	>({
		query: PageBlockDocument,
		variables: {
			type,
		},
	})

	return {
		block: data.pageBlock,
		error,
	}
}
