import {
	Sort,
	Visibility,
	useCategoriesSelectQuery,
} from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const useManageSelectCategories = (excludeName?: string) => {
	const { data } = useCategoriesSelectQuery({
		variables: {
			query: {
				sort: Sort.Desc,
				visibility: Visibility.Visible,
			},
		},
	})

	return {
		categories: data?.categories.categories
			.filter((category) => category.name !== excludeName)
			.map(
				(category): IOption => ({
					label: category.name,
					value: category.id,
				})
			),
	}
}
