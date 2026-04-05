import Menu from '@/components/ui/elements/menu/Menu'
import type { FC } from 'react'
import styles from '../ExpandedFooterColumns.module.scss'
import type { IExpandedFooterColumn } from '../interface/expanded-footer-columns.interface'

const ExpandedFooterColumn: FC<{ column: IExpandedFooterColumn }> = ({
	column: { title, items },
}) => {
	return (
		<div className={styles.col}>
			<h3 className={styles.title}>{title}</h3>
			<Menu
				items={items}
				listClassName={styles.list}
				linkClassName={styles.link}
			/>
		</div>
	)
}

export default ExpandedFooterColumn
