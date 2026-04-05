import {
	Sort,
	Visibility,
	useServicesSelectQuery,
} from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const useManageSelectServices = (excludeName?: string) => {
	const { data } = useServicesSelectQuery({
		variables: {
			query: {
				sort: Sort.Desc,
				visibility: Visibility.Visible,
			},
		},
	})

	return {
		services: data?.services.services.map(
			(service): IOption => ({
				label: service.name,
				value: service.id,
			})
		),
	}
}
