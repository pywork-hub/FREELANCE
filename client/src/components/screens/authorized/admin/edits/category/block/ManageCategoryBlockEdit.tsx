import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import TextEditor from '@/components/ui/common/form/text-editor/TextEditor'
import { REQUIRED_EDITOR_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import cn from 'clsx'
import { ListPlus, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../../ManageEdits.module.scss'
import styles from '../ManageCategoryEdit.module.scss'
import type { IManageCategoryBlockEdit } from './interface/manage-category-block-edit.interface'

const ManageCategoryBlockEdit: FC<IManageCategoryBlockEdit> = ({
	blockItems,
	registerInput,
	resetField,
	control,
	errors,
	isShow,
	setIsShow,
}) => {
	return (
		<div className={styles.block}>
			<Heading variant="h2" className={globalStyles.title}>
				Текстовый Блок
			</Heading>
			{isShow.block && (
				<>
					<div className={globalStyles.fill}>
						<Field
							{...registerInput('block.heading')}
							className={styles.generalField}
							label="Основной заголовок (Не обязательно)"
							error={errors.block?.heading}
						/>
						{blockItems.fields.map((field, index) => (
							<div className={styles.object} key={field.id}>
								<div className={styles.objectItem}>
									<Field
										{...registerInput(`block.items.${index}.heading`)}
										className={styles.objectField}
										label="Заголовок (Не обязательно)"
										error={
											errors.block?.items && errors.block.items[index]?.heading
										}
									/>
									<Controller
										name={`block.items.${index}.content`}
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
												label="Описание"
											/>
										)}
										rules={REQUIRED_EDITOR_VALIDATION('Описание')}
									/>
								</div>
								<Button
									type="button"
									buttonClassName={styles.remove}
									wrapperClassName={styles.removeWrapper}
									onClick={() => {
										if (blockItems.fields.length === 1) {
											setIsShow((prev) => {
												resetField('block')

												return {
													...prev,
													block: false,
												}
											})
										}
										blockItems.remove(index)
									}}
								>
									<Trash2 />
									Удалить
								</Button>
							</div>
						))}
					</div>
					<Button
						type="button"
						wrapperClassName={styles.addWrapper}
						buttonClassName={styles.add}
						onClick={() => blockItems.append({ content: '' })}
					>
						<ListPlus />
						Добавить
					</Button>
				</>
			)}
			<div className={globalStyles.toggles}>
				<Button
					type="button"
					buttonClassName={cn(globalStyles.toggle, {
						[globalStyles.remove]: isShow.block,
					})}
					wrapperClassName={globalStyles.toggleWrapper}
					onClick={() =>
						setIsShow((prev) => {
							const isShow = !prev.block

							isShow ? blockItems.append({ content: '' }) : resetField('block')

							return {
								...prev,
								block: isShow,
							}
						})
					}
				>
					{isShow.block ? 'Убрать все блоки' : 'Добавить блок'}
				</Button>
			</div>
		</div>
	)
}

export default ManageCategoryBlockEdit
