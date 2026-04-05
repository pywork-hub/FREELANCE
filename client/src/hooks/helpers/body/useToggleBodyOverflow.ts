import { IS_CLIENT } from '@/constants/global.constants'

export const useToggleBodyOverflow = (isRemoved: boolean) => {
	if (IS_CLIENT) {
		document.body.style.overflowY = isRemoved ? 'hidden' : 'visible'
	}
}
