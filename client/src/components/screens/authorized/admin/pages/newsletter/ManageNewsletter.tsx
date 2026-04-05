'use client'

import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import ReactSelect from '@/components/ui/common/form/react-select/ReactSelect'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import Heading from '@/components/ui/elements/heading/Heading'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import ManageSidebar from '@/components/ui/templates/manage/sidebar/ManageSidebar'
import { useNewsletterFile } from '@/hooks/helpers/files/useNewsletterFile'
import { useSendNewsletter } from '@/hooks/manage/newsletter/useSendNewsletter'
import cn from 'clsx'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import globalStyles from '../ManagePages.module.scss'
import styles from './ManageNewsletter.module.scss'

const ManageNewsletter: FC = () => {
	const {
		registerInput,
		control,
		errors,
		handleSubmit,
		onSubmit,
		setValue,
		loading,
	} = useSendNewsletter()

	const { file, getInputProps, getRootProps, isDragActive, deleteFile } =
		useNewsletterFile(setValue)

	return (
		<div className={globalStyles.wrapper}>
			<ManageSidebar hasSearch={false} />
			<div className={globalStyles.content}>
				<div className={globalStyles.top}>
					<Heading variant="h1" className={globalStyles.heading}>
						E-mail рассылки
					</Heading>
				</div>
				<div className={globalStyles.fill}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<Field
							{...registerInput('subject', REQUIRED_VALIDATION('Заголовок'))}
							className={styles.field}
							label="Заголовок"
							error={errors.subject}
						/>
						<Controller
							name="emails"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									isMulti
									isCreatable
									field={field}
									options={[]}
									label="E-mail Пользователей (Если надо конкретным пользователям отправить)"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<div className={styles.upload}>
							{file ? (
								<div className={styles.box}>
									<p className={styles.text}>
										<span>Файл выбран</span>
									</p>
								</div>
							) : (
								<div
									className={cn(styles.box, {
										[styles.dragged]: isDragActive,
									})}
									{...getRootProps()}
								>
									<input {...getInputProps()} />
									<p className={styles.text}>
										<span>Перетащите</span> HTML файл сюда
									</p>
								</div>
							)}
							<button
								className={styles.delete}
								onClick={deleteFile}
								type="button"
							>
								Удалить файл
							</button>
						</div>
						<Button
							buttonClassName={styles.update}
							wrapperClassName={styles.updateWrapper}
							disabled={loading}
						>
							{loading ? <MiniLoader /> : 'Отправить'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ManageNewsletter
