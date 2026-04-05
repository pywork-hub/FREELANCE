import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IId } from '@/shared/interfaces/id/id.interface'
import cn from 'clsx'
import type { FC, PropsWithChildren } from 'react'
import styles from './Section.module.scss'

const Section: FC<PropsWithChildren<IClassName & IId>> = ({
	children,
	className,
	id,
}) => {
	return (
		<section className={cn(styles.section, className && className)} id={id}>
			{children}
		</section>
	)
}

export default Section
