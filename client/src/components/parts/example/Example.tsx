import StaticImage from '@/components/ui/common/image/StaticImage'
import ManageActions from '@/components/ui/elements/manage-actions/ManageActions'
import { ADMIN_EDITS } from '@/constants/url.constants'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { IExample } from '@/shared/interfaces/example/example.interface'
import type { IManageItem } from '@/shared/interfaces/manage/manage.interface'
import cn from 'clsx'
import { Link as LinkIcon, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { type FC } from 'react'
import styles from './Example.module.scss'
import ExampleReview from './review/ExampleReview'

const Example: FC<IExample & IManageItem & IClassName> = ({
	example,
	place = 'public',
	deleteHandler,
	duplicateHandler,
	toggleHandler,
	openGallery,
	className,
}) => {
	return (
		<li className={cn(styles.example, className && className)}>
			<StaticImage
				src={example.coverPath}
				width={400}
				height={300}
				alt={example.name}
			/>
			<div className={styles.buttons}>
				{example.review && (
					<ExampleReview review={example.review} url={example.url} />
				)}
				{example.url && (
					<Link className={styles.link} href={example.url} target="_blank">
						<LinkIcon />
					</Link>
				)}
				<button className={styles.view} onClick={openGallery}>
					<Maximize2 />
				</button>
			</div>
			{example.url ? (
				<Link className={styles.fill} href={example.url} target="_blank">
					<h3 className={styles.name}>{example.name}</h3>
				</Link>
			) : (
				<div className={styles.fill}>
					<h3 className={styles.name}>{example.name}</h3>
				</div>
			)}
			<ManageActions
				place={place}
				editUrl={ADMIN_EDITS.EXAMPLE(example.id)}
				visibility={example.visibility}
				toggleHandler={toggleHandler}
				duplicateHandler={duplicateHandler}
				deleteHandler={deleteHandler}
			/>
		</li>
	)
}

export default Example
