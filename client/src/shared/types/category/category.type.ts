import type { CatalogQuery, CategoriesQuery } from '@/__generated__/output'

export type TypeCategories = CategoriesQuery['categories']['categories']
export type TypeCategory = TypeCategories[0]

export type TypeCatalogCategory = CatalogQuery['catalog']['categories'][0]
