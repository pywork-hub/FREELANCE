import type {
	CatalogQuery,
	CurrentServiceQuery,
	ServicesQuery,
} from '@/__generated__/output'

export type TypeService = ServicesQuery['services']['services'][0]

export type TypeCurrentServiceData = CurrentServiceQuery['currentService']

export type TypeCurrentService = NonNullable<TypeCurrentServiceData['service']>

export type TypeCurrentServiceSimilarServices =
	TypeCurrentServiceData['similarServices']
