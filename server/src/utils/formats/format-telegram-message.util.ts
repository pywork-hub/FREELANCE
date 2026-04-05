import { anchorBrRegex } from '../regex/br.regex'
import { anchorUrlRegex, urlRegex } from '../regex/url.regex'

export const fromTelegramMessageFormat = (text: string) => {
	return text
		.replace(anchorBrRegex, '\n')
		.replace(anchorUrlRegex, (_, group) => {
			const urlMatch = group.match(urlRegex)
			return urlMatch ? urlMatch[0] : group
		})
}
