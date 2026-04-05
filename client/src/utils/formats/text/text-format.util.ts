import {
	anchorBrRegex,
	brRegex,
	removableBrRegex,
} from '@/utils/regex/br.regex'
import { anchorUrlRegex, urlRegex } from '@/utils/regex/url.regex'

export const chatTextFormat = (text: string) => {
	return text.replace(removableBrRegex, '')
}

export const textFullFormat = (text: string) => {
	return text
		.replace(brRegex, '<br>')
		.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`)
}

export const fromTextFullFormat = (text: string) => {
	return text
		.replace(anchorBrRegex, '\n')
		.replace(anchorUrlRegex, (_, group) => {
			const urlMatch = group.match(urlRegex)
			return urlMatch ? urlMatch[0] : group
		})
}

export const textFormat = (text: string) => {
	return text
		.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`)
		.replace(anchorBrRegex, '')
}
