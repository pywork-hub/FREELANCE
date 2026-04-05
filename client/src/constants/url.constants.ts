import { PageType } from '@/__generated__/output'

export const ADMIN_PAGES = {
	ROOT: '/manage',
	ANALYTICS: `/manage/analytics`,
	USERS: `/manage/users`,
	CATEGORIES: '/manage/categories',
	EXAMPLES: '/manage/examples',
	SERVICES: '/manage/services',
	ATTRIBUTES: '/manage/characteristics',
	REQUESTS: '/manage/requests',
	HOME: '/manage/home',
	MARKET: '/manage/market',
	NEWSLETTER: '/manage/newsletter',
}

export const ADMIN_EDITS = {
	USER: (id: number) => `${ADMIN_PAGES.ROOT}/user/edit/${id}`,
	CATEGORY: (id: number) => `${ADMIN_PAGES.ROOT}/category/edit/${id}`,
	EXAMPLE: (id: number) => `${ADMIN_PAGES.ROOT}/example/edit/${id}`,
	SERVICE: (id: number) => `${ADMIN_PAGES.ROOT}/service/edit/${id}`,
	ATTRIBUTE: (id: number) => `${ADMIN_PAGES.ROOT}/characteristic/edit/${id}`,
	PAGE: (type: PageType) => `${ADMIN_PAGES.ROOT}/page/edit?type=${type}`,
}

export const ADMIN_VIEWS = {
	REQUEST: (id: number) => `${ADMIN_PAGES.ROOT}/request/view/${id}`,
}

export const ADMIN_CHILDRENS = {
	CATEGORY: (parentSlug: string) =>
		`${ADMIN_PAGES.ROOT}/category/childrens/${parentSlug}`,
}

export const ERROR_PAGES = {
	NOT_FOUND: '/not-found',
}

export const PUBLIC_PAGES = {
	HOME: '/',
	LOGIN: '/auth?type=login',
	REGISTER: '/auth?type=register',
	REDIRECT: '/auth/redirect',
	LOST: '/auth?type=lost',
	MARKET: '/market',
	FAQ: '/faq',
	ABOUT: '/about',
	REQUISITES: '/requisites',
	POLICY: '/privacy-policy',
	CONTACT: '/contact',
	CATEGORY: (slug: string) => `/category/${slug}`,
	SERVICE: (slug: string) => `/service/${slug}`,
	REVIEWS: (slug: string) => `/reviews/${slug}`,
	SEARCH: (searchTerm: string) => `/market/?searchTerm=${searchTerm}`,
}

export const USER_PAGES = {
	PROFILE: `/profile`,
	SETTINGS: `/settings`,
	ORDERS: '/orders',
	FAVORITES: '/favorites',
	CHAT: (login?: string) => `/chat${login ? '/' + login : ''}`,
}
