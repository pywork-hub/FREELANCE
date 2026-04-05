import {
	MessageStatus,
	useMessageActionMutation,
	type MessageActionInput,
} from '@/__generated__/output'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const usePostMessage = (
	roomId: number,
	toggleTypingStop: () => void
) => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
		setValue,
	} = useForm<MessageActionInput>({
		mode: 'onChange',
		defaultValues: {
			roomId,
			action: MessageStatus.Posted,
		},
	})

	const [postMessage] = useMessageActionMutation({
		onError: () => {
			toast.error('Ошибка при отправке сообщения.')
		},
		onCompleted: () => {
			setValue('content', '')
			toggleTypingStop()
		},
	})

	const onSubmit: SubmitHandler<MessageActionInput> = async (data) => {
		if (!data.content) return

		reset()
		await postMessage({
			variables: {
				data,
			},
		})
	}

	return {
		handleSubmit,
		onSubmit,
		control,
		errors
	}
}
