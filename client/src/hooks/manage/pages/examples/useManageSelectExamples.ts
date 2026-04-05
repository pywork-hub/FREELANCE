import {
	Sort,
	Visibility,
	useExamplesSelectQuery,
} from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const useManageSelectExamples = () => {
	const { data } = useExamplesSelectQuery({
		variables: {
			query: {
				sort: Sort.Desc,
				visibility: Visibility.Visible,
			},
		},
	})

	return {
		examples: data?.examples.examples
			.map(
				(example): IOption => ({
					label: example.name,
					value: example.id,
				})
			),
	}
}
