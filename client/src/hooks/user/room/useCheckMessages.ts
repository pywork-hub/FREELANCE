import { useCheckMessagesMutation } from '@/__generated__/output'

export const useCheckMessages = () => {
	const [mutate] = useCheckMessagesMutation()

	const checkMessages = (roomId: number, messagesIds: number[]) => {
		mutate({
			variables: {
				roomId,
				messagesIds,
			},
		})
	}

	return { checkMessages, mutate }
}
