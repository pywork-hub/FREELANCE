import { UserRole, type SessionUser } from '@/__generated__/output'
import { useEffect, useState, type RefObject } from 'react'
import toast from 'react-hot-toast'

export const useReviewMessage = (
	user: SessionUser,
	contentRef: RefObject<HTMLDivElement>
) => {
	const [isShow, setIsShow] = useState(false)
	const [serviceId, setServiceId] = useState<string | null>(null)

	useEffect(() => {
		const handleClick = (event: Event) => {
			const target = event.target as HTMLElement
			const id = target.dataset.id || null

			if (!id) {
				toast.error('Услуга не найдена.')
				setServiceId(null)
				return
			} else if (
				user.roles.includes(UserRole.Admin) ||
				user.roles.includes(UserRole.Manager)
			) {
				toast.error('Отзыв может оставить только заказчик.')
				setServiceId(null)
				return
			}

			setServiceId(id)
			setIsShow(true)
		}

		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					const opener = contentRef.current?.querySelector('.review__opener')
					if (opener) {
						opener.addEventListener('click', handleClick)
					}
				}
			}
		})

		observer.observe(document.body, { childList: true, subtree: true })

		return () => {
			observer.disconnect()
			const opener = contentRef.current?.querySelector('.review__opener')
			if (opener) {
				opener.removeEventListener('click', handleClick)
			}
		}
	}, [])

	const closeModal = () => setIsShow(false)

	return {
		isShow,
		closeModal,
		serviceId,
	}
}
