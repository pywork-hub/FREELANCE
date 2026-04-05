import { cookies } from 'next/headers'

export class CookieService {
	static setCookiesToContext() {
		const allCookies = cookies().getAll()

		const credentials = Object.fromEntries(
			allCookies.map((cookie) => [cookie.name, cookie.value])
		)

		return {
			context: {
				headers: {
					cookie: Object.entries(credentials).map(([name, value]) => `${name}=${value}`).join('; ')
				}
			},
		}
	}
}
