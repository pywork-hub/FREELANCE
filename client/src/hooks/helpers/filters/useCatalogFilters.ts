import type {
	TypeCatalogAttribute,
	TypeCatalogParams,
} from '@/shared/types/filter/filter.type'
import { usePathname, type ReadonlyURLSearchParams } from 'next/navigation'

export const useCatalogFilters = (
	attributes: TypeCatalogAttribute[],
	searchParams: ReadonlyURLSearchParams
) => {
	const pathname = usePathname()

	const updateQueryParams = (
		key: string,
		value: string,
		multiple: boolean = true
	) => {
		const newParams = new URLSearchParams(searchParams?.toString())

		if (!multiple) {
			newParams.delete(key)
		}

		if (value) {
			if (multiple) {
				newParams.append(key, value)
			} else {
				newParams.set(key, value)
			}
		}

		const newUrl = `${pathname}?${newParams.toString()}`
		window.history.pushState(null, '', newUrl)
	}

	const removeQueryParam = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams?.toString())

		if (newParams.has(key)) {
			const existingValues = newParams.getAll(key)
			const filteredValues = existingValues.filter((val) => val !== value)

			newParams.delete(key)
			filteredValues.forEach((val) => newParams.append(key, val))
		}

		const newUrl = `${pathname}?${newParams.toString()}`
		window.history.pushState(null, '', newUrl)
	}

	const reset = () => {
		const newUrl = `${pathname}`
		window.history.pushState(null, '', newUrl)
	}

	const getPropertyBySlug = (
		attributes: TypeCatalogAttribute[],
		value: string
	): TypeCatalogAttribute['properties'][0] | undefined => {
		return attributes
			.flatMap((attr) => attr.properties)
			.find((prop) => prop.slug === value)
	}

	const getParams = (): TypeCatalogParams[] => {
		if (!searchParams) return []
		return Array.from(searchParams.entries()).map(([key, value]) => {
			let label: string

			switch (key) {
				case 'searchTerm':
					label = `Поиск: ${value}`
					break
				case 'minPrice':
					label = `От: Мин. Цена - ${value}`
					break
				case 'maxPrice':
					label = `До: Мин. Цена - ${value}`
					break
				case 'minTerm':
					label = `От: Мин. Срок - ${value}`
					break
				case 'maxTerm':
					label = `До: Мин. Срок - ${value}`
					break
				default:
					label = getPropertyBySlug(attributes, value)?.name || ''
					break
			}

			return {
				label,
				key,
				value,
			}
		})
	}

	return { updateQueryParams, removeQueryParam, reset, params: getParams() }
}
