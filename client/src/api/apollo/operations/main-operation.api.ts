import type { Operation } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

export const mainOperation = (apolloOperation: Operation) => {
	const definition = getMainDefinition(apolloOperation.query)

	return (
		definition.kind === 'OperationDefinition' &&
		(definition.operation === 'subscription')
	)
}
