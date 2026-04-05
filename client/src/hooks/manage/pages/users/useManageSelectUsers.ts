import { Sort, useUsersSelectQuery } from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const useManageSelectUsers = () => {
	const { data } = useUsersSelectQuery({
		variables: {
			query: {
				sort: Sort.Desc,
			},
		},
	})

	return {
		users: data?.users.users.map(
			(user): IOption => ({
				label: `${user.profile.login} (${user.profile.email})`,
				value: user.id,
			})
		),
	}
}
