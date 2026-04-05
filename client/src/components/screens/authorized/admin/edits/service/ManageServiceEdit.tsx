'use client'

import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import TermField from '@/components/ui/common/form/term-field/TermField'
import TextEditor from '@/components/ui/common/form/text-editor/TextEditor'
import UploadField from '@/components/ui/common/form/upload-field/UploadField'
import {
	NUMBER_PATTERN_VALIDATION,
	REQUIRED_EDITOR_VALIDATION,
	REQUIRED_VALIDATION,
} from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import { useManageSelectProperties } from '@/hooks/manage/edits/attribute/useManageSelectProperties'
import { useManageServiceEdit } from '@/hooks/manage/edits/service/useManageServiceEdit'
import { useManageSelectCategories } from '@/hooks/manage/pages/categories/useManageSelectCategories'
import { useManageSelectExamples } from '@/hooks/manage/pages/examples/useManageSelectExamples'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManageEdits.module.scss'
import styles from './ManageServiceEdit.module.scss'
import ManageServiceSeoEdit from './seo/ManageServiceSeoEdit'

const ManageServiceEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const {
		registerInput,
		resetField,
		control,
		errors,
		data,
		handleSubmit,
		onSubmit,
		isShow,
		setIsShow,
	} = useManageServiceEdit(queryId)
	const { categories } = useManageSelectCategories()
	const { examples } = useManageSelectExamples()
	const { properties } = useManageSelectProperties()

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						Редактирование - {data?.serviceById.name || 'Услуги'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<Field
							{...registerInput('name', REQUIRED_VALIDATION('Название'))}
							className={styles.field}
							label="Название"
							error={errors.name}
						/>
						<Controller
							name="fromTerm"
							control={control}
							render={({ field: { value, onChange } }) => (
								<TermField
									onChange={onChange}
									value={value || 86400}
									className={styles.field}
								/>
							)}
						/>
						<Controller
							name="fromPrice"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									onChange={(e) => onChange(parseFloat(e.target.value))}
									value={value || 100}
									className={styles.field}
									label="Мин. Цена"
									error={error}
								/>
							)}
							rules={{
								...REQUIRED_VALIDATION('Мин. Цена'),
								...NUMBER_PATTERN_VALIDATION(100),
							}}
						/>
						<Controller
							name="fromSalePrice"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									onChange={(e) =>
										onChange(
											!isNaN(+e.target.value) && e.target.value
												? parseFloat(e.target.value)
												: 0
										)
									}
									value={value || undefined}
									className={styles.field}
									label="Мин. Скидочная Цена (Не обязательно)"
									error={error}
								/>
							)}
							rules={NUMBER_PATTERN_VALIDATION(100)}
						/>
						<Controller
							name="examples"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									field={field}
									options={examples || []}
									label="Примеры"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="categories"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									field={field}
									options={categories || []}
									label="Категории"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="properties"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									field={field}
									options={properties || []}
									label="Характеристики"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="excerpt"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									className={styles.editor}
									onChange={onChange}
									error={error}
									value={value}
									label="Краткое описание"
								/>
							)}
							rules={REQUIRED_EDITOR_VALIDATION('Краткое описание')}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									className={styles.editor}
									onChange={onChange}
									error={error}
									value={value}
									label="Полное описание"
								/>
							)}
							rules={REQUIRED_EDITOR_VALIDATION('Полное описание')}
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
									label="Баннер"
								/>
							)}
							rules={REQUIRED_VALIDATION('Баннер')}
						/>
						<Controller
							name="videoPath"
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
									isNoImage
									label="Видео"
								/>
							)}
							rules={REQUIRED_VALIDATION('Видео')}
						/>
						<ManageServiceSeoEdit
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

export default ManageServiceEdit
