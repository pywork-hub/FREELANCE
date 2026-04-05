import {
	CatalogDocument,
	Sort,
	Visibility,
	type CatalogQuery,
	type CatalogQueryVariables,
	type QueryFullestInput,
} from '@/__generated__/output'
import { serverApolloClient } from '@/api/apollo/apollo.client'

export const useCatalog = async (categorySlug?: string) => {
	const query: QueryFullestInput = {
		sort: Sort.Desc,
		visibility: Visibility.Visible,
	}

	const { data, error } = await serverApolloClient.query<
		CatalogQuery,
		CatalogQueryVariables
	>({
		query: CatalogDocument,
		variables: {
			data: {
				categorySlug,
				categoryInput: {
					...query,
					...(!categorySlug ? { isParents: true } : {}),
				},
				serviceInput: query,
			},
		},
	})

	return {
		categories: data?.catalog.categories || [],
		filters: data.catalog.filters || null,
		block: data.catalog.block || null,
		seo: data.catalog.seo || null,
		categoryName: data.catalog.categoryName || null,
		error,
	}
}
