import {
	CategoriesDocument,
	type CategoriesQuery,
	type CategoriesQueryVariables,
	type CategoryQueryInput,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useCategories = async (input: CategoryQueryInput) => {
	const { data, error } = await serverApolloClient.query<
		CategoriesQuery,
		CategoriesQueryVariables
	>({
		query: CategoriesDocument,
		variables: {
			query: input,
		},
	})

	return {
		categories: data?.categories.categories || [],
		count: data.categories.count || 0,
		error,
	}
}
