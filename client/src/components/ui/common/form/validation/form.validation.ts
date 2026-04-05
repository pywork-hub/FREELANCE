import { validEmail } from '@/utils/regex/email.regex'
import { stripHtml } from 'string-strip-html'

export const REQUIRED_VALIDATION = (name: string) => ({
	required: `${name} обязательно.`,
})

export const LENGTH_VALIDATION = (name: string, length: number) => ({
	required: `${name} обязательно.`,
	minLength: {
		value: length,
		message: `Минимальная длина должна быть не менее ${length} символов.`,
	},
})

export const MIN_VALIDATION = (min: number) => ({
	min: {
		value: min,
		message: `Минимум - ${min}.`,
	},
})

export const MAX_VALIDATION = (max: number) => ({
	max: {
		value: max,
		message: `Максимум - ${max}.`,
	},
})

export const EMAIL_VALIDATION = () => ({
	required: 'E-mail обязательно.',
	pattern: {
		value: validEmail,
		message: 'Пожалуйста, введите корректный E-mail.',
	},
})

export const PRICE_VALIDATION = () => ({
	pattern: {
		value: /^\d+$/,
		message: 'Введите число.',
	},
})

export const NUMBER_PATTERN_VALIDATION = (number: number) => ({
	pattern: {
		value: /^\d+$/,
		message: `Введите число в формате, например: ${number}`,
	},
})

export const REQUIRED_EDITOR_VALIDATION = (name: string) => ({
	validate: {
		required: (v: string) =>
			(v && stripHtml(v).result.length > 0) || `${name} обязательно.`,
	},
})
