import { registerEnumType } from '@nestjs/graphql'

export enum PageType {
	HOME = 'HOME',
	MARKET = 'MARKET',
}

registerEnumType(PageType, {
	name: 'PageType',
})
