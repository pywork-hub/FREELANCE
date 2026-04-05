'use client'

import { apolloClient } from '@/api/apollo/apollo.client'
import { ACCENT_COLOR, IS_DEVELOPMENT } from '@/constants/global.constants'
import { ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import NextTopLoader from 'nextjs-toploader'
import ReactToaster from './react/ReactToaster'
import AuthConfirmationProvider from './timer/AuthConfirmationProvider'
import AuthVerificationProvider from './timer/AuthVerificationProvider'
import ContactProvider from './timer/ContactProvider'

if (IS_DEVELOPMENT) {
	loadDevMessages()
	loadErrorMessages()
}

export default function MainProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<NextTopLoader
				color={ACCENT_COLOR}
				height={2}
				showSpinner={false}
				zIndex={10}
			/>
			<ApolloProvider client={apolloClient()}>
				<AuthConfirmationProvider />
				<AuthVerificationProvider />
				<ContactProvider />
				{children}
				<ReactToaster />
			</ApolloProvider>
		</>
	)
}
