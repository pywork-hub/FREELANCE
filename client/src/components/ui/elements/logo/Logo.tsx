import { SITE_NAME } from '@/constants/seo.constants'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { ILogo } from '@/shared/interfaces/logo/logo.interface'
import cn from 'clsx'
import Link from 'next/link'
import type { FC } from 'react'
import StaticImage from '../../common/image/StaticImage'
import styles from './Logo.module.scss'

const Logo: FC<ILogo & IClassName> = ({ width, height, className }) => {
	return (
		<Link href="/" className={cn(styles.logo, className && className)}>
			<StaticImage
				src="/images/global/logo.svg"
				width={width}
				height={height}
				alt={SITE_NAME}
			/>
		</Link>
	)
}

export default Logo
