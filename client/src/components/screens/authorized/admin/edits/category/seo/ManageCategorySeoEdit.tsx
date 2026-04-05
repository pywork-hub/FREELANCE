import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import UploadField from '@/components/ui/common/form/upload-field/UploadField'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import cn from 'clsx'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../../ManageEdits.module.scss'
import styles from '../ManageCategoryEdit.module.scss'
import type { IManageCategorySeoEdit } from './interface/manage-category-seo-edit.interface'

const ManageCategorySeoEdit: FC<IManageCategorySeoEdit> = ({
	registerInput,
	resetField,
	control,
	errors,
	isShow,
	setIsShow,
}) => {
	return (
		<div className={globalStyles.seo}>
			<Heading variant="h2" className={globalStyles.title}>
				СЕО
			</Heading>
			{isShow.seo && (
				<>
					<div className={globalStyles.seoItem}>
						<div className={globalStyles.fill}>
							<Field
								{...registerInput('seo.title', REQUIRED_VALIDATION('Название'))}
								className={globalStyles.generalField}
								label="Название"
								error={errors.seo?.title}
							/>
							<Field
								{...registerInput(
									'seo.description',
									REQUIRED_VALIDATION('Описание')
								)}
								className={globalStyles.generalField}
								label="Описание"
								error={errors.seo?.description}
							/>
							<Controller
								name="seo.keywords"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<ReactSelect
										isMulti
										isCreatable
										field={field}
										options={[]}
										label="Теги"
										error={error}
										className={globalStyles.generalSelect}
									/>
								)}
								rules={REQUIRED_VALIDATION('Теги')}
							/>
						</div>
					</div>
					{isShow.graphs && (
						<div className={globalStyles.seoItem}>
							<Heading variant="h2" className={globalStyles.title}>
								Сео для соц. сетей
							</Heading>
							<div className={globalStyles.fill}>
								<Field
									{...registerInput(
										'seo.graphs.title',
										REQUIRED_VALIDATION('Название')
									)}
									className={globalStyles.socialField}
									label="Название"
									error={errors.seo?.graphs?.title}
								/>
								<Field
									{...registerInput(
										'seo.graphs.description',
										REQUIRED_VALIDATION('Описание')
									)}
									className={globalStyles.socialField}
									label="Описание"
									error={errors.seo?.graphs?.description}
								/>
								<div className={globalStyles.object}>
									<div className={globalStyles.objectItem}>
										<Controller
											name="seo.graphs.images.0.url"
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
													label="Картинка - (1200 * 630)"
												/>
											)}
											rules={REQUIRED_VALIDATION('Картинка')}
										/>
										<Field
											{...registerInput(
												'seo.graphs.images.0.alt',
												REQUIRED_VALIDATION('Alt для картинки')
											)}
											className={globalStyles.objectField}
											label="Alt для картинки"
											error={
												errors.seo?.graphs?.images &&
												errors.seo.graphs.images[0]?.alt
											}
										/>
									</div>
									<div className={globalStyles.objectItem}>
										<Controller
											name="seo.graphs.images.1.url"
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
													label="Картинка - (1080 * 1080)"
												/>
											)}
											rules={REQUIRED_VALIDATION('Картинка')}
										/>
										<Field
											{...registerInput(
												'seo.graphs.images.1.alt',
												REQUIRED_VALIDATION('Alt для картинки')
											)}
											className={globalStyles.objectField}
											label="Alt для картинки"
											error={
												errors.seo?.graphs?.images &&
												errors.seo?.graphs.images[1]?.alt
											}
										/>
									</div>
									<div className={globalStyles.objectItem}>
										<Controller
											name="seo.graphs.images.2.url"
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
													label="Картинка - (600 * 315)"
												/>
											)}
											rules={REQUIRED_VALIDATION('Картинка')}
										/>
										<Field
											{...registerInput(
												'seo.graphs.images.2.alt',
												REQUIRED_VALIDATION('Alt для картинки')
											)}
											className={globalStyles.objectField}
											label="Alt для картинки"
											error={
												errors.seo?.graphs?.images &&
												errors.seo?.graphs.images[2]?.alt
											}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
			<div className={globalStyles.toggles}>
				<Button
					type="button"
					buttonClassName={cn(globalStyles.toggle, {
						[globalStyles.remove]: isShow.seo,
					})}
					wrapperClassName={globalStyles.toggleWrapper}
					onClick={() =>
						setIsShow((prev) => {
							const isShow = !prev.seo

							if (!isShow) resetField('seo')

							return {
								...prev,
								seo: !prev.seo,
								graphs: prev.seo === false && false,
							}
						})
					}
				>
					{isShow.seo ? 'Убрать весь сео' : 'Добавить сео'}
				</Button>
				{isShow.seo && (
					<Button
						type="button"
						buttonClassName={cn(globalStyles.toggle, {
							[globalStyles.remove]: isShow.graphs,
						})}
						wrapperClassName={cn(
							globalStyles.toggleWrapper,
							globalStyles.graphsBtn
						)}
						onClick={() =>
							setIsShow((prev) => {
								const isShow = !prev.graphs

								if (!isShow) resetField('seo.graphs')

								return {
									...prev,
									graphs: !prev.graphs,
								}
							})
						}
					>
						{isShow.graphs
							? 'Убрать сео для соц. сетей'
							: 'Добавить сео для соц. сетей'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ManageCategorySeoEdit
