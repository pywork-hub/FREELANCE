import {
	GetFolderItemsDocument,
	useCreateFolderMutation,
	type CreateFolderInput,
} from '@/__generated__/output'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import type { FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import type { IStorageActionsItem } from '../interface/storage-actions.interface'
import styles from './StorageCreateFolder.module.scss'

const StorageCreateFolder: FC<IStorageActionsItem> = ({
	folderPath,
	setIsShow,
}) => {
	const {
		register: registerInput,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<CreateFolderInput>({
		mode: 'onChange',
	})

	const [createFolder] = useCreateFolderMutation()

	const onSubmit: SubmitHandler<CreateFolderInput> = async (data) => {
		await createFolder({
			variables: {
				data: {
					name: data.name,
					folderPath,
				},
			},
			refetchQueries: [GetFolderItemsDocument],
			onCompleted: () => {
				reset()
				setIsShow(false)
				toast.success('Папка успешно создана')
			},
			onError: () => {
				toast.error('Ошибка при создании папки')
			},
		})
	}

	return (
		<div className={styles.folder}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Field
					{...registerInput('name', REQUIRED_VALIDATION('Название папки'))}
					className={styles.field}
					label="Название папки"
					error={errors.name}
				/>
				<Button
					wrapperClassName={styles.addWrapper}
					buttonClassName={styles.add}
				>
					Создать
				</Button>
			</form>
		</div>
	)
}

export default StorageCreateFolder
