import NumberField from '@/components/ui/common/form/number-field/NumberField'
import type { TypeCatalogRangeFiltersData } from '@/shared/types/filter/filter.type'
import type { FC } from 'react'
import styles from '../CatalogFilters.module.scss'

const CatalogFiltersTerm: FC<TypeCatalogRangeFiltersData> = ({
	onChange,
	values,
	errors,
}) => {
	return (
		<div className={styles.filter}>
			<h4 className={styles.title}>Мин. Срок (День)</h4>
			<div className={styles.fields}>
				<div className={styles.field}>
					<NumberField
						label="От"
						value={values.minTerm}
						onChange={(e) => onChange(e, 'minTerm')}
						error={errors.minTerm}
					/>
				</div>
				<div className={styles.field}>
					<NumberField
						label="До"
						value={values.maxTerm}
						onChange={(e) => onChange(e, 'maxTerm')}
						error={errors.maxTerm}
					/>
				</div>
			</div>
		</div>
	)
}

export default CatalogFiltersTerm
