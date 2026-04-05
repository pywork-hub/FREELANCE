module.exports = {
	apps: [
		{
			name: 'next-app',
			script: 'yarn',
			args: 'start',
			watch: true,
			ignore_watch: ['node_modules', 'logs', '.next/cache'],
			env: {
				REACT_APP_ENV: 'production',
				REACT_APP_DOMAIN: 'domain.com',
				SITE_URL: 'https://domain.com',
				APP_SERVER_URL: 'https://back.domain.com',
				APP_CDN_URL: 'https://cdn-edge.domain.com',
				GRAPHQL_SERVER_URL: 'https://back.domain.com/api/mygraphql',
				IRON_PASSWORD:
					'password',
			},
		},
	],
}
