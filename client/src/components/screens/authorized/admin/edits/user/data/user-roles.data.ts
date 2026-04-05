import { UserRole } from '@/__generated__/output'
import type { IOption } from '@/components/ui/common/form/react-select/interface/react-select.interface'

export const USER_ROLES_DATA: IOption[] = [
	{
		label: 'Админ',
		value: UserRole.Admin,
	},
	{
		label: 'Менеджер',
		value: UserRole.Manager,
	},
	{
		label: 'Пользователь',
		value: UserRole.User,
	},
]
