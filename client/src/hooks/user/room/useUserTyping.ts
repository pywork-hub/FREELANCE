import { useUserTypingSubscription } from '@/__generated__/output'

export const useUserTyping = (roomId: number, userId: number) => {
	const { data } = useUserTypingSubscription({
		variables: {
			roomId,
			userId,
		},
	})

	return { isPartnerTyping: data?.userTyping?.isPartnerTyping }
}
