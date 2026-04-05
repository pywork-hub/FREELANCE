module.exports = {
	apps: [
		{
			name: 'nest-app',
			script: 'yarn',
			args: 'start',
			watch: true,
			ignore_watch: [
				'node_modules',
				'dist',
				'uploads',
				'src/resources/mail/templates',
				'src/schema/schema.gql',
			],
			env: {
				NODE_ENV: 'production',
				REACT_APP_URL: 'https://domain.com',
				CDN_EDGE_PREFIX: '/var/www',
				DOMAIN: 'domain.com',
				NOTICE_DOMAIN: 'notice.domain.com',
				EMAIL_SERVICE: 'beget',
				EMAIL_HOST: 'smtp.beget.com',
				EMAIL_PORT: '465',
				EMAIL_USER: 'support@domain.com',
				EMAIL_PASSWORD: 'password',
				NOTICE_PASSWORD: 'password',
				NOTICE_PORT: '6379',
				PORT: '4200',
				DATABASE_URL:
					'postgresql://user:password@localhost:5432/base?schema=public',
				JWT_SECRET: "&*!%@$^**&()&*>{:'<'}'>ASC:{'X><}",
				SHOP_ID: 'id',
				PAYMENT_TOKEN: 'token',
			},
		},
	],
}
