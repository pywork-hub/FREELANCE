import NumberField from '@/components/ui/common/form/number-field/NumberField'
import type { TypeCatalogRangeFiltersData } from '@/shared/types/filter/filter.type'
import type { FC } from 'react'
import styles from '../CatalogFilters.module.scss'

const CatalogFiltersPrice: FC<TypeCatalogRangeFiltersData> = ({
	onChange,
	values,
	errors,
}) => {
	return (
		<div className={styles.filter}>
			<h4 className={styles.title}>Мин. Цена</h4>
			<div className={styles.fields}>
				<div className={styles.field}>
					<NumberField
						label="От"
						value={values.minPrice}
						onChange={(e) => onChange(e, 'minPrice')}
						error={errors.minPrice}
					/>
				</div>
				<div className={styles.field}>
					<NumberField
						label="До"
						value={values.maxPrice}
						onChange={(e) => onChange(e, 'maxPrice')}
						error={errors.maxPrice}
					/>
				</div>
			</div>
		</div>
	)
}

export default CatalogFiltersPrice
