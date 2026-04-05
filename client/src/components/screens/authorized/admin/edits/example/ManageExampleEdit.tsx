'use client'

import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import UploadField from '@/components/ui/common/form/upload-field/UploadField'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import { useManageExampleEdit } from '@/hooks/manage/edits/example/useManageExampleEdit'
import { useManageSelectServices } from '@/hooks/manage/pages/services/useManageSelectServices'
import { useManageSelectUsers } from '@/hooks/manage/pages/users/useManageSelectUsers'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManageEdits.module.scss'
import styles from './ManageExampleEdit.module.scss'

const ManageExampleEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { registerInput, control, errors, data, handleSubmit, onSubmit } =
		useManageExampleEdit(queryId)
	const { users } = useManageSelectUsers()
	const { services } = useManageSelectServices()

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						Редактирование - {data?.exampleById.name || 'Примера'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<Field
							{...registerInput('name', REQUIRED_VALIDATION('Название'))}
							className={styles.field}
							label="Название"
							error={errors.name}
						/>
						<Field
							{...registerInput('url')}
							className={styles.field}
							label="Ссылка (Не обязательно)"
							error={errors.url}
						/>
						<Controller
							name="service"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									field={field}
									options={services || []}
									label="Услуга (Не обязательно)"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="user"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									field={field}
									options={users || []}
									label="Заказчик (Не обязательно)"
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
									label="Баннер"
								/>
							)}
							rules={REQUIRED_VALIDATION('Баннер')}
						/>
						<Controller
							name="imagePath"
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
									label="Главная картинка"
								/>
							)}
							rules={REQUIRED_VALIDATION('Главная картинка')}
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

export default ManageExampleEdit
