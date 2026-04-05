import Container from '@/components/ui/common/container/Container'
import Logo from '@/components/ui/elements/logo/Logo'
import type { IModalState } from '@/shared/interfaces/modal/modal.interface'
import type { FC } from 'react'
import styles from './ExpandedFooterColumns.module.scss'
import { EXPANDED_FOOTER_COLUMNS_DATA } from './data/expanded-footer-columns.data'
import ExpandedFooterColumn from './item/ExpandedFooterColumn'

const ExpandedFooterColumns: FC<IModalState> = ({ setIsShow }) => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<Logo width={120} height={25} className={styles.logo} />
					<div className={styles.cols}>
						{EXPANDED_FOOTER_COLUMNS_DATA({ setIsShow }).columns.map(
							(column, index) => (
								<ExpandedFooterColumn key={index} column={column} />
							)
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}

export default ExpandedFooterColumns
