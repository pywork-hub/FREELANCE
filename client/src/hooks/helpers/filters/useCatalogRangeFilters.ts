import type {
	TypeCatalogFilters,
	TypeCatalogRangeFilters,
	TypeCatalogRangeFiltersErrors,
} from '@/shared/types/filter/filter.type'
import { catalogRangeFilters } from '@/utils/helpers/filters/catalog-range-filters.util'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect, useState, type ChangeEvent } from 'react'

export const useCatalogRangeFilters = (
	filters: TypeCatalogFilters,
	updateQueryParams: (key: string, value: string, multiple?: boolean) => void,
	searchParams: ReadonlyURLSearchParams
) => {
	const [errors, setErrors] = useState<TypeCatalogRangeFiltersErrors>({
		minPrice: '',
		maxPrice: '',
		minTerm: '',
		maxTerm: '',
	})

	const [values, setValues] = useState({
		minPrice: 0,
		maxPrice: 0,
		minTerm: 0,
		maxTerm: 0,
	})

	useEffect(() => {
		setValues(catalogRangeFilters(filters, searchParams))
	}, [filters, searchParams])

	const onChange = (
		e: ChangeEvent<HTMLInputElement>,
		variant: keyof TypeCatalogRangeFilters
	) => {
		const newValue = parseFloat(e.target.value) || 0

		let newErrors = {
			minPrice: '',
			maxPrice: '',
			minTerm: '',
			maxTerm: '',
		}
		if (isNaN(newValue)) return

		if (!newValue && newValue !== 0) {
			newErrors[variant] = `Поле обязательно.`
		} else if (variant === 'minPrice') {
			if (newValue < filters.minPrice) {
				newErrors[variant] = `Минимум - ${filters.minPrice}`
			} else if (newValue > values.maxPrice) {
				newErrors[variant] = `Максимум - ${values.maxPrice}`
			}
		} else if (variant === 'maxPrice') {
			if (newValue < values.minPrice) {
				newErrors[variant] = `Минимум - ${values.minPrice}`
			} else if (newValue > filters.maxPrice) {
				newErrors[variant] = `Максимум - ${filters.maxPrice}`
			}
		} else if (variant === 'minTerm') {
			if (newValue < filters.minTerm) {
				newErrors[variant] = `Минимум - ${filters.minTerm}`
			} else if (newValue > values.maxTerm) {
				newErrors[variant] = `Максимум - ${values.maxTerm}`
			}
		} else if (variant === 'maxTerm') {
			if (newValue < values.minTerm) {
				newErrors[variant] = `Минимум - ${values.minTerm}`
			} else if (newValue > filters.maxTerm) {
				newErrors[variant] = `Максимум - ${filters.maxTerm}`
			}
		}

		setErrors(newErrors)
		setValues((prev) => ({
			...prev,
			[variant]: newValue,
		}))
		if (
			!newErrors.minPrice &&
			!newErrors.maxPrice &&
			!newErrors.minTerm &&
			!newErrors.maxTerm
		) {
			setTimeout(() => {
				updateQueryParams(variant, String(newValue), false)
			}, 300)
		}
	}

	return {
		onChange,
		values,
		errors,
	}
}
