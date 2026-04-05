import { EnumStorage } from '@/constants/storage.constants'
import type { IAuthStore } from '@/shared/interfaces/store/store.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const createStoreWithTimer = (storeName: string) => {
	return create<IAuthStore>()(
		persist<IAuthStore>(
			(set, get) => {
				let interval: NodeJS.Timeout | undefined

				return {
					remainingTime: 0,
					setTimer: (remainingTime: number) => {
						if (interval) {
							clearInterval(interval)
						}

						set({ remainingTime })

						interval = setInterval(() => {
							const newRemainingTime = get().remainingTime - 1

							if (newRemainingTime <= 0) {
								clearInterval(interval)
								interval = undefined
							}

							set({ remainingTime: newRemainingTime })
						}, 1000)
					},
					clearTimer: () => {
						if (!interval) return
						clearInterval(interval)
						interval = undefined
						set({ remainingTime: 0 })
					},
				}
			},
			{
				name: storeName,
			}
		)
	)
}

export const useAuthConfirmationStore = createStoreWithTimer(
	EnumStorage.CONFIRMATION_TIMER
)

export const useAuthVerificationStore = createStoreWithTimer(
	EnumStorage.VERIFICATION_TIMER
)

export const useContactStore = createStoreWithTimer(EnumStorage.CONTACT_TIMER)
