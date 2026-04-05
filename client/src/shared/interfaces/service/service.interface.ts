import type { TypeCatalogCategory } from '@/shared/types/category/category.type'
import type { TypeReview } from '@/shared/types/review/review.type'
import type {
	TypeCurrentService,
	TypeCurrentServiceSimilarServices,
	TypeService,
} from '@/shared/types/service/service.type'
import type { ICatalogFilters } from '../filter/filter.interface'

export interface IServiceId {
	serviceId: number
}

export interface IService {
	service: TypeService
	isClicked?: boolean
	onClick?: () => void
}

export interface ICatalogServices extends ICatalogFilters {
	services: TypeService[]
	servicesCount: number
	categories: TypeCatalogCategory[]
}

export interface ICurrentServiceData {
	reviewsCount: number
	service: TypeCurrentService
	similarServices: TypeCurrentServiceSimilarServices
}

export interface ICurrentService {
	service: TypeCurrentService
}

export interface ICurrentServiceReviews {
	serviceId: number
	serviceSlug: string
	reviews: TypeReview[]
	count: number
}

export interface ICurrentServiceSimilarServices {
	similarServices: TypeCurrentServiceSimilarServices
}
