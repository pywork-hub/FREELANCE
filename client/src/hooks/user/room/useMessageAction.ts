import {
	MessageStatus,
	useMessageActionMutation,
	type MessageActionInput,
} from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useMessageAction = (
	roomId: number,
	setIsEditActive: Dispatch<SetStateAction<boolean>>
) => {
	const { handleSubmit, reset, control, setValue } =
		useForm<MessageActionInput>({
			mode: 'onChange',
			defaultValues: {
				roomId,
			},
		})

	const [mutate] = useMessageActionMutation()

	const deleteMessage = (messageId: number) =>
		mutate({
			variables: {
				data: {
					roomId,
					messageId,
					action: MessageStatus.Deleted,
				},
			},
		})

	const onSubmit: SubmitHandler<MessageActionInput> = async (data) => {
		if (!data.content) return

		await mutate({
			variables: {
				data: {
					...data,
					action: MessageStatus.Edited,
				},
			},
			onError: () => {
				toast.error('Ошибка при изменении сообщения.')
			},
		})

		setIsEditActive(false)
	}

	return {
		reset,
		handleSubmit,
		onSubmit,
		control,
		deleteMessage,
		setValue,
	}
}
