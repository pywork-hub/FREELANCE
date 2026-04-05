import cn from 'clsx'
import type { FC, PropsWithChildren } from 'react'
import styles from './Heading.module.scss'
import type { IHeading } from './interface/heading.interface'

const Heading: FC<PropsWithChildren<IHeading>> = ({
	children,
	variant,
	className,
}) => {
	const HeadingTag = variant

	return (
		<HeadingTag
			className={cn(
				styles.heading,
				{
					[styles.h1]: variant === 'h1',
					[styles.h2]: variant === 'h2',
					[styles.h3]: variant === 'h3',
					[styles.h4]: variant === 'h4',
					[styles.h5]: variant === 'h5',
					[styles.h6]: variant === 'h6',
				},
				className && className
			)}
		>
			{children}
		</HeadingTag>
	)
}

export default Heading
