import type {
	TypeCatalogCategory,
	TypeCategories,
	TypeCategory,
} from '@/shared/types/category/category.type'

export interface ICategory {
	category: TypeCategory
}

export interface ICategories {
	categories: TypeCategories
}

export interface ICatalogCategories {
	categories: TypeCatalogCategory[]
}
