import {
	ReviewsDocument,
	type QueryInput,
	type ReviewsQuery,
	type ReviewsQueryVariables,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useReviews = async (slug: string, input: QueryInput) => {
	const { data, error } = await serverApolloClient.query<
		ReviewsQuery,
		ReviewsQueryVariables
	>({
		query: ReviewsDocument,
		variables: {
			slug,
			query: input,
		},
	})

	return {
		reviews: data?.reviews.reviews || [],
		count: data?.reviews.count || 0,
		error,
	}
}
