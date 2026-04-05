import { SITE_NAME } from '@/constants/seo.constants'
import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { ITable } from '@/shared/interfaces/table/table.interface'
import cn from 'clsx'
import type { FC } from 'react'
import StaticImage from '../../common/image/StaticImage'
import styles from './Table.module.scss'

const Table: FC<ITable & IClassName> = ({
	labels,
	heading,
	rows,
	imageWidth,
	imageHeight,
	className,
}) => {
	return (
		<div className={cn(styles.wrapper, className && className)}>
			<div className={styles.top}>
				<heading.icon />
				<h2 className={styles.title}>{heading.title}</h2>
			</div>
			<table className={styles.table}>
				<thead>
					<tr className={styles.row}>
						{labels.map((label, index) => (
							<th key={index} className={styles.label}>{label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr key={index} className={styles.row}>
							{row.columns.map(({ value, isImage }, index) => (
								<td key={index} className={styles.item}>
									{isImage ? (
										<StaticImage
											src={value}
											width={imageWidth}
											height={imageHeight}
											alt={SITE_NAME}
										/>
									) : (
										value
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
