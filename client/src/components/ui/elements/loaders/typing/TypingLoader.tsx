import { ACCENT_COLOR } from '@/constants/global.constants'
import type { FC } from 'react'

const TypingLoader: FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 200 200"
			className="w-6 h-6"
		>
			<circle
				fill={ACCENT_COLOR}
				stroke={ACCENT_COLOR}
				strokeWidth="15"
				r="15"
				cx="40"
				cy="100"
			>
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="-.4"
				/>
			</circle>
			<circle
				fill={ACCENT_COLOR}
				stroke={ACCENT_COLOR}
				strokeWidth="15"
				r="15"
				cx="100"
				cy="100"
			>
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="-.2"
				/>
			</circle>
			<circle
				fill={ACCENT_COLOR}
				stroke={ACCENT_COLOR}
				strokeWidth="15"
				r="15"
				cx="160"
				cy="100"
			>
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="0"
				/>
			</circle>
		</svg>
	)
}

export default TypingLoader
