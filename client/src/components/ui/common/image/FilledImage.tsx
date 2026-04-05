import Image from 'next/image'
import type { FC } from 'react'
import type { IFilledImage } from './interface/image.interface'

const FilledImage: FC<IFilledImage> = ({
	quality = 100,
	src,
	alt,
	className,
}) => {
	return (
		<Image
			quality={quality}
			draggable={false}
			priority
			fill
			sizes='100vw'
			src={src}
			alt={alt}
			className={className && className}
		/>
	)
}

export default FilledImage
