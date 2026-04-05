import { useToggleTypingMutation } from '@/__generated__/output'
import { useState } from 'react'

export const useToggleTyping = (roomId: number) => {
	const [toggleTyping] = useToggleTypingMutation()
	const [isUserTyping, setIsUserTyping] = useState(false)

	const toggleTypingStart = () => {
		toggleTyping({
			variables: {
				data: {
					roomId,
					isTyping: true,
				},
			},
			onCompleted: () => {
				setIsUserTyping(true)
			},
		})
	}

	const toggleTypingStop = () => {
		toggleTyping({
			variables: {
				data: {
					roomId,
					isTyping: false,
				},
			},
			onCompleted: () => {
				setIsUserTyping(false)
			},
		})
	}

	return { isUserTyping, toggleTypingStart, toggleTypingStop }
}
