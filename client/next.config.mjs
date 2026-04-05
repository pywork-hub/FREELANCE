/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	env: {
		APP_ENV: process.env.REACT_APP_ENV,
		APP_DOMAIN: process.env.REACT_APP_DOMAIN,
		SITE_URL: process.env.SITE_URL,
		APP_SERVER_URL: process.env.APP_SERVER_URL,
		APP_CDN_URL: process.env.APP_CDN_URL,
		APP_GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
		IRON_PASSWORD: process.env.IRON_PASSWORD,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${this.env.APP_CDN_URL}/uploads/:path*`,
				// destination: `${this.env.APP_SERVER_URL}/uploads/:path*`,
			},
		]
	},
	images: {
		remotePatterns: [],
	},
}

export default nextConfig
