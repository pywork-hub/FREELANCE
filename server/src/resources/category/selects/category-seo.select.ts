import { nestedBlockSelect } from 'src/resources/block/select/block.select'
import { nestedSeoSelect } from 'src/resources/seo/select/seo.select'

export const catalogCategorynestedSeoSelect = {
	name: true,
	...nestedBlockSelect,
	...nestedSeoSelect,
}
