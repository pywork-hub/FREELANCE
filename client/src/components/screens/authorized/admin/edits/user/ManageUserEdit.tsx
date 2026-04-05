'use client'

import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import { useManageUserEdit } from '@/hooks/manage/edits/user/useManageUserEdit'
import { ListPlus, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManageEdits.module.scss'
import styles from './ManageUserEdit.module.scss'
import { USER_ROLES_DATA } from './data/user-roles.data'
import Heading from '@/components/ui/elements/heading/Heading'

const ManageUserEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { registerInput, control, errors, bots, data, handleSubmit, onSubmit, } =
		useManageUserEdit(queryId)

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						Редактирование - {data?.userById.profile.login || 'Пользователя'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="roles"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									field={field}
									options={USER_ROLES_DATA}
									label="Роли"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<div className={styles.bots}>
							<h2 className={styles.objectTitle}>Телеграм Боты</h2>
							{bots.fields.map((field, index) => (
								<div className={styles.object} key={field.id}>
									<div className={styles.objectFill}>
										<Field
											{...registerInput(
												`bots.${index}.chatId`,
												REQUIRED_VALIDATION('Чат ID')
											)}
											className={styles.objectField}
											label="Чат ID"
											error={errors.bots && errors.bots[index]?.chatId}
										/>
										<Field
											{...registerInput(
												`bots.${index}.token`,
												REQUIRED_VALIDATION('Токен')
											)}
											className={styles.objectField}
											label="Токен"
											error={errors.bots && errors.bots[index]?.token}
										/>
									</div>
									<Button
										type="button"
										buttonClassName={styles.remove}
										wrapperClassName={styles.removeWrapper}
										onClick={() => bots.remove(index)}
									>
										<Trash2 />
										Удалить бота
									</Button>
								</div>
							))}
							<Button
								type="button"
								buttonClassName={styles.add}
								onClick={() => bots.append({ chatId: '', token: '' })}
							>
								<ListPlus />
								Добавить бота
							</Button>
						</div>
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

export default ManageUserEdit
