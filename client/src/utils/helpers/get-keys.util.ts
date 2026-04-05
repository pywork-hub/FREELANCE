export const getKeys = <T extends object>(
	obj: T
): Array<{ key: keyof T; value: any }> => {
	const keys: Array<{ key: keyof T; value: any }> = []

	const traverse = (currentObj: Record<string, any>, parentKey?: string) => {
		for (const key in currentObj) {
			const isArrayIndex = /^\d+$/.test(key)
			const fullKey = parentKey
				? `${parentKey}${isArrayIndex ? `[${key}]` : `.${key}`}`
				: key
			keys.push({ key: fullKey as keyof T, value: currentObj[key] })
			if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
				traverse(currentObj[key], fullKey)
			}
		}
	}

	traverse(obj)

	return keys
}
