import { ApolloLink } from '@apollo/client'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { errorLink } from '../error/apollo-error.api'
import { uploadLink } from './apollo-upload.api'

const removeTypenameLink = removeTypenameFromVariables()

export const mainServerLink = ApolloLink.from([
	removeTypenameLink,
	errorLink,
	uploadLink,
])
