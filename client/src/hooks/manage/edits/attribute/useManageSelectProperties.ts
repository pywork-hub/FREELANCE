import { usePropertiesSelectQuery } from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const useManageSelectProperties = (excludeName?: string) => {
	const { data } = usePropertiesSelectQuery()

	return {
		properties: data?.properties.map(
			(property): IOption => ({
				label: `${property.attribute.name}: ${property.name}`,
				value: property.id,
			})
		),
	}
}
