import type { ChangeEvent } from 'react'

export interface IManageSidebar {
	hasSearch?: boolean
	searchTerm?: string
	handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void
}
