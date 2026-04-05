'use client'

import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import { useManageAttributeEdit } from '@/hooks/manage/edits/attribute/useManageAttributeEdit'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManageEdits.module.scss'
import styles from './ManageAttributeEdit.module.scss'
import Heading from '@/components/ui/elements/heading/Heading'

const ManageAttributeEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { registerInput, control, errors, data, handleSubmit, onSubmit } =
		useManageAttributeEdit(queryId)

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						Редактирование - {data?.attributeById.name || 'Характеристики'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<Field
							{...registerInput('name', REQUIRED_VALIDATION('Название'))}
							className={styles.field}
							label="Название"
							error={errors.name}
						/>
						<Controller
							name="properties"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									isCreatable
									field={field}
									options={[]}
									label="Опции"
									error={error}
									className={styles.select}
								/>
							)}
							rules={REQUIRED_VALIDATION('Опции')}
						/>
						<Button
							buttonClassName={globalStyles.update}
							wrapperClassName={globalStyles.updateWrapper}
						>
							Обновить
						</Button>
					</form>
				</div>
			</Container>
		</div>
	)
}

export default ManageAttributeEdit
