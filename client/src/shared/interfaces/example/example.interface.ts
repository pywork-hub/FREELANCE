import type {
	TypeExample,
	TypeExampleReview,
} from '@/shared/types/example/example.type'

export interface IExample {
	example: TypeExample
	openGallery?: () => void
}

export interface IExampleReview {
	review: TypeExampleReview
	url?: string | null
}
