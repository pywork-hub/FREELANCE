import type { FC } from 'react'
import ExpandedHeaderCategories from './categories/ExpandedHeaderCategories'
import ExpandedHeaderTop from './top/ExpandedHeaderTop'

const ExpandedHeader: FC = () => {
	return (
		<header>
			<ExpandedHeaderTop />
			<ExpandedHeaderCategories />
		</header>
	)
}

export default ExpandedHeader
