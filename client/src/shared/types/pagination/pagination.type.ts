import type { QueryInput } from '@/__generated__/output'

export type TypePagination = Pick<NonNullable<QueryInput>, 'perPage' | 'page'>

export type TypeRequiredPagination = {
	perPage: NonNullable<TypePagination['perPage']>
	page: NonNullable<TypePagination['page']>
}
