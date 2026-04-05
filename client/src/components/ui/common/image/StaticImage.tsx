import Image from 'next/image'
import type { FC } from 'react'
import type { IImage } from './interface/image.interface'

const StaticImage: FC<IImage> = ({
	quality = 100,
	src,
	alt,
	width,
	height,
	sizes,
	className,
}) => {
	return (
		<Image
			quality={quality}
			draggable={false}
			priority
			width={width}
			height={height}
			sizes={sizes}
			src={src}
			alt={alt}
			className={className && className}
		/>
	)
}

export default StaticImage
