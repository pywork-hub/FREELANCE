import Service from '@/components/parts/service/Service'
import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import SearchField from '@/components/ui/common/form/search-field/SearchField'
import { REQUIRED_VALIDATION } from '@/components/ui/common/form/validation/form.validation'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import ClientPagination from '@/components/ui/elements/pagination/client/ClientPagination'
import Modal from '@/components/ui/templates/modal/Modal'
import { useAddExample } from '@/hooks/user/example/useAddExample'
import type { IRoom } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import type { FC } from 'react'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerExample: FC<IRoom & TypeExistUser> = ({
	room,
	user,
}) => {
	const {
		searchTerm,
		handleSearch,
		page,
		perPage,
		setPage,
		services,
		count,
		isShow,
		openModal,
		closeModal,
		registerInput,
		errors,
		handleSubmit,
		onSubmit,
		loading,
		setValue,
		watch,
	} = useAddExample(room.partner.id)

	return (
		<>
			<button onClick={openModal} className={styles.exampleBtn}>
				Добавить пример
			</button>
			{isShow && (
				<Modal heading="Добавить пример" size="xl" closeModal={closeModal}>
					{loading ? (
						<MiniLoader className={styles.loader} />
					) : (
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
							<div className={styles.fill}>
								<SearchField
									searchTerm={searchTerm}
									handleSearch={handleSearch}
									className={styles.search}
									placeholder="Найти..."
								/>
								<ul className={styles.services}>
									{services.map((service) => (
										<Service
											className={styles.service}
											service={service}
											onClick={() => setValue('serviceId', service.id)}
											isClicked={+watch('serviceId') === service.id}
											user={user}
											place="public"
										/>
									))}
								</ul>
							</div>
							{count > perPage && (
								<ClientPagination
									className={styles.pagination}
									page={page}
									perPage={perPage}
									length={count}
									goToPrev={() =>
										setPage(page > 1 ? String(page - 1) : String(page))
									}
									goToNext={() =>
										setPage(page < count ? String(page + 1) : String(page))
									}
								/>
							)}
							<Button
								buttonClassName={styles.submit}
								wrapperClassName={styles.submitWrapper}
							>
								Добавить
							</Button>
						</form>
					)}
				</Modal>
			)}
		</>
	)
}

export default CurrentChatBannerExample
