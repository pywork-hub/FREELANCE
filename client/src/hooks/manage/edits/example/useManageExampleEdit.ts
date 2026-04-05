import {
	useExampleByIdQuery,
	useUpdateExampleMutation,
	type ExampleInput,
} from '@/__generated__/output'
import { ADMIN_PAGES } from '@/constants/url.constants'
import { getKeys } from '@/utils/helpers/get-keys.util'
import { useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

export const useManageExampleEdit = (queryId: string) => {
	const {
		register: registerInput,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<ExampleInput>({
		mode: 'onChange',
	})

	const { push } = useRouter()
	const exampleId = +queryId

	const { data } = useExampleByIdQuery({
		variables: {
			id: exampleId,
		},
		skip: !exampleId,
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: ({ exampleById }) => {
			const { user, service, ...response } = exampleById

			if (user) {
				const selectedUser = {
					name: `${user.profile.login} (${user.profile.email})`,
					value: user.id,
				}
				setValue('user', selectedUser)
			}

			if (service) {
				const selectedService = {
					name: service.name,
					value: service.id,
				}
				setValue('service', selectedService)
			}

			getKeys(response).forEach(({ key, value }) => {
				setValue(key, value)
			})
		},
	})

	const [updateExample] = useUpdateExampleMutation({
		onCompleted: () => {
			push(ADMIN_PAGES.EXAMPLES)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit: SubmitHandler<ExampleInput> = async (data) => {
		await updateExample({
			variables: {
				id: exampleId,
				data,
			},
		})
	}

	return { registerInput, control, errors, handleSubmit, onSubmit, data }
}
