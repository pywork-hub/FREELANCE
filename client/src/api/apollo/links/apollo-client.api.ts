import { ApolloLink, split } from '@apollo/client'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { errorLink } from '../error/apollo-error.api'
import { mainOperation } from '../operations/main-operation.api'
import { uploadLink } from './apollo-upload.api'
import { wsLink } from './apollo-socket.api'

const removeTypenameLink = removeTypenameFromVariables()

export const mainClientLink = split(
	(operation) => mainOperation(operation),
	wsLink,
	ApolloLink.from([removeTypenameLink, errorLink, uploadLink])
)
