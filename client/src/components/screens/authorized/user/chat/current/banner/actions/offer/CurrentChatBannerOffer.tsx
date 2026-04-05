'use client'

import Button from '@/components/ui/common/form/button/Button'
import Field from '@/components/ui/common/form/field/Field'
import TermField from '@/components/ui/common/form/term-field/TermField'
import TextEditor from '@/components/ui/common/form/text-editor/TextEditor'
import {
	NUMBER_PATTERN_VALIDATION,
	REQUIRED_EDITOR_VALIDATION,
	REQUIRED_VALIDATION,
} from '@/components/ui/common/form/validation/form.validation'
import MiniLoader from '@/components/ui/elements/loaders/mini/MiniLoader'
import Modal from '@/components/ui/templates/modal/Modal'
import { useCreateOffer } from '@/hooks/user/room/useCreateOffer'
import type { IRoomId } from '@/shared/interfaces/room/room.interface'
import { useState, type FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../../CurrentChatBanner.module.scss'

const CurrentChatBannerOffer: FC<IRoomId> = ({ roomId }) => {
	const [isShow, setIsShow] = useState(false)
	const { loading, registerInput, errors, control, handleSubmit, onSubmit } =
		useCreateOffer(roomId, setIsShow)

	return (
		<>
			<button className={styles.offerBtn} onClick={() => setIsShow(true)}>
				Предложение
			</button>
			{isShow && (
				<Modal
					heading="Отправить предложение"
					size="xl"
					closeModal={() => setIsShow(false)}
				>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<Field
							{...registerInput('name', REQUIRED_VALIDATION('Название'))}
							className={styles.field}
							label="Название"
							error={errors.name}
						/>
						<Controller
							name="price"
							control={control}
							defaultValue={100}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									onChange={(e) => onChange(parseFloat(e.target.value))}
									value={value}
									className={styles.field}
									label="Цена"
									error={error}
								/>
							)}
							rules={{
								...REQUIRED_VALIDATION('Цена'),
								...NUMBER_PATTERN_VALIDATION(100),
							}}
						/>
						<Controller
							name="term"
							control={control}
							defaultValue={86400}
							render={({ field: { value, onChange } }) => (
								<TermField
									onChange={onChange}
									value={value}
									className={styles.term}
								/>
							)}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									className={styles.editor}
									onChange={onChange}
									error={error}
									value={value}
									label="Описание"
								/>
							)}
							rules={REQUIRED_EDITOR_VALIDATION('Описание')}
						/>
						{loading ? (
							<div className={styles.offerLoader}>
								<MiniLoader />
							</div>
						) : (
							<Button
								buttonClassName={styles.submit}
								wrapperClassName={styles.submitWrapper}
							>
								Отправить
							</Button>
						)}
					</form>
				</Modal>
			)}
		</>
	)
}

export default CurrentChatBannerOffer
