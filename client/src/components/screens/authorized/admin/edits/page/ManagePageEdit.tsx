'use client'

import { PageType } from '@/__generated__/output'
import Container from '@/components/ui/common/container/Container'
import Button from '@/components/ui/common/form/button/Button'
import Heading from '@/components/ui/elements/heading/Heading'
import { useManagePageEdit } from '@/hooks/manage/edits/page/useManagePageEdit'
import type { IPageSearchParam } from '@/shared/interfaces/param/param.interface'
import type { FC } from 'react'
import globalStyles from '../ManageEdits.module.scss'
import ManagePageBlockEdit from './block/ManagePageBlockEdit'
import ManagePageSeoEdit from './seo/ManagePageSeoEdit'

const ManagePageEdit: FC<IPageSearchParam> = ({ searchParams }) => {
	let type = searchParams?.type ? String(searchParams.type) : PageType.Home
	const isHome = type === PageType.Home

	const {
		registerInput,
		control,
		handleSubmit,
		onSubmit,
		errors,
		resetField,
		blockItems,
		isShow,
		setIsShow,
	} = useManagePageEdit(type as PageType)

	return (
		<div className={globalStyles.edit}>
			<Container>
				<div className={globalStyles.wrapper}>
					<Heading variant="h1" className={globalStyles.heading}>
						{isHome ? 'Главная' : 'Маркет'}
					</Heading>
					<form className={globalStyles.form} onSubmit={handleSubmit(onSubmit)}>
						<ManagePageSeoEdit
							registerInput={registerInput}
							control={control}
							resetField={resetField}
							errors={errors}
							isShow={isShow}
							setIsShow={setIsShow}
						/>
						<ManagePageBlockEdit
							blockItems={blockItems}
							registerInput={registerInput}
							control={control}
							resetField={resetField}
							errors={errors}
							isShow={isShow}
							setIsShow={setIsShow}
						/>
						<Button
							buttonClassName={globalStyles.update}
							wrapperClassName={globalStyles.updateWrapper}
						>
							Обновить
						</Button>
					</form>
				</div>
			</Container>
		</div>
	)
}

export default ManagePageEdit
