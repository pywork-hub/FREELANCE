import type { Dispatch, SetStateAction } from 'react'

export interface IServerPagination {
	length: number
	perPage: number
	page: number
}

export interface IClientPagination {
	length: number
	page: number
	perPage: number
	goToPrev: () => void
	goToNext: () => void
}
