'use client'

import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import UploadField from '@/components/ui/common/form/upload-field/UploadField'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import { useManageCategoryEdit } from '@/hooks/manage/edits/category/useManageCategoryEdit'
import { useManageSelectCategories } from '@/hooks/manage/pages/categories/useManageSelectCategories'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManageEdits.module.scss'
import styles from './ManageCategoryEdit.module.scss'
import ManageCategoryBlockEdit from './block/ManageCategoryBlockEdit'
import ManageCategorySeoEdit from './seo/ManageCategorySeoEdit'

const ManageCategoryEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const {
		registerInput,
		control,
		errors,
		data,
		handleSubmit,
		onSubmit,
		isShow,
		setIsShow,
		resetField,
		blockItems,
	} = useManageCategoryEdit(queryId)
	const { categories } = useManageSelectCategories(data?.categoryById.name)

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						Редактирование - {data?.categoryById.name || 'Категории'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<Field
							{...registerInput('name', REQUIRED_VALIDATION('Название'))}
							className={styles.field}
							label="Название"
							error={errors.name}
						/>
						<Controller
							name="parents"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									field={field}
									options={categories || []}
									label="Родители (Не обязательно)"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="coverPath"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									className={styles.upload}
									onChange={onChange}
									value={value}
									error={error}
									label="Картинка"
								/>
							)}
							rules={REQUIRED_VALIDATION('Картинка')}
						/>
						<ManageCategorySeoEdit
							registerInput={registerInput}
							resetField={resetField}
							control={control}
							errors={errors}
							isShow={isShow}
							setIsShow={setIsShow}
						/>
						<ManageCategoryBlockEdit
							blockItems={blockItems}
							registerInput={registerInput}
							resetField={resetField}
							control={control}
							errors={errors}
							isShow={isShow}
							setIsShow={setIsShow}
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

export default ManageCategoryEdit
