import type { IImage } from '@/components/ui/common/image/interface/image.interface'

export interface IStatsItem {
	image?: IImage
	number: number
	description: string
}

export interface IStats {
	items: IStatsItem[]
}
