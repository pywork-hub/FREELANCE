import type { IModal } from '@/shared/interfaces/modal/modal.interface'
import cn from 'clsx'
import { X } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

const Modal: FC<PropsWithChildren<IModal>> = ({
	children,
	className,
	closeModal,
	heading,
	size = 'md',
}) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('modal'))

	if (!modalRef.current) return null

	return ReactDOM.createPortal(
		<div className={cn(styles.overlay, className && className)}>
			<div
				className={cn(styles.window, {
					[styles.extraLarge]: size === 'xl',
					[styles.large]: size === 'lg',
					[styles.medium]: size === 'md',
					[styles.small]: size === 'sm',
				})}
			>
				<div className={styles.top}>
					<h2 className={styles.heading}>{heading}</h2>
					<button onClick={closeModal} className={styles.close}>
						<X />
					</button>
				</div>
				<div className={styles.fill}>{children}</div>
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
