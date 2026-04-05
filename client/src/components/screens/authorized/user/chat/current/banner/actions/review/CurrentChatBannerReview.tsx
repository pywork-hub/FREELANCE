import Service from '@/components/parts/service/Service'
import SearchField from '@/components/ui/common/form/search-field/SearchField'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import ClientPagination from '@/components/ui/elements/pagination/client/ClientPagination'
import Modal from '@/components/ui/templates/modal/Modal'
import { useReviewServices } from '@/hooks/user/review/useReviewServices'
import type { IRoomId } from '@/shared/interfaces/room/room.interface'
import type { TypeExistUser } from '@/shared/types/user/user.type'
import type { FC } from 'react'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerReview: FC<TypeExistUser & IRoomId> = ({
	user,
	roomId,
}) => {
	const {
		services,
		count,
		page,
		perPage,
		setPage,
		isShow,
		openModal,
		closeModal,
		createReviewOffer,
		loading,
		searchTerm,
		handleSearch,
	} = useReviewServices(roomId)

	return (
		<>
			<button onClick={openModal} className={styles.reviewBtn}>
				Оставить отзыв
			</button>
			{isShow && (
				<Modal heading="Выберите услугу" size="xl" closeModal={closeModal}>
					{loading ? (
						<MiniLoader className={styles.loader} />
					) : (
						<>
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
										onClick={() => createReviewOffer(service.id)}
										user={user}
										place="public"
									/>
								))}
							</ul>
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
						</>
					)}
				</Modal>
			)}
		</>
	)
}

export default CurrentChatBannerReview
