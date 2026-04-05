import { useOtherManagersQuery } from '@/__generated__/output'

export const useOtherManagers = () => {
	const { data } = useOtherManagersQuery()

	return {
		managers: data?.otherManagers || [],
	}
}
