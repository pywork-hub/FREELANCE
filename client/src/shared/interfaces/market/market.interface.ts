import type { Block, ServiceQueryInput } from '@/__generated__/output'
import type { TypeCatalogCategory } from '@/shared/types/category/category.type'
import type { TypeCatalogFilters } from '@/shared/types/filter/filter.type'
import type { TypeRequiredPagination } from '@/shared/types/pagination/pagination.type'
import type { TypeService } from '@/shared/types/service/service.type'
import type { TypeIronUser } from '@/shared/types/user/user.type'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'

export interface IMarket extends TypeIronUser {
	categories: TypeCatalogCategory[]
	slug?: string
	filters: TypeCatalogFilters
	block: Block | null
}

export interface IMarketServices
	extends Pick<IMarket, 'user' | 'categories' | 'filters'> {
	className?: string
	searchParams: ReadonlyURLSearchParams
	services: TypeService[]
	properties: string[]
	servicesCount: number
	setQuery: Dispatch<SetStateAction<ServiceQueryInput & TypeRequiredPagination>>
	loading: boolean
}

export interface IMarketAbout extends Pick<IMarket, 'block'> {}
