import type { IServerPagination } from '@/shared/interfaces/pagination/pagination.interface'
import type { TypePagination } from '@/shared/types/pagination/pagination.type'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useServerPagination = ({ page, length }: IServerPagination) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { push } = useRouter()

	const updatePaginationParams = (key: keyof TypePagination, value: string) => {
		const newParams = new URLSearchParams(searchParams?.toString())

		if (value) {
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		push(pathname + `?${newParams.toString()}`)
	}

	const goToPreviousPage = () => {
		if (page > 1) {
			const previousPage = (page - 1).toString()
			updatePaginationParams('page', previousPage)
		}
	}

	const goToNextPage = () => {
		if (page < length) {
			const nextPage = (page + 1).toString()
			updatePaginationParams('page', nextPage)
		}
	}

	return { goToPreviousPage, goToNextPage }
}
