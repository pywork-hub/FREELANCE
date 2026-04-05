import type { CurrentServiceQuery, ExamplesQuery } from '@/__generated__/output'
import type { TypeCurrentService } from '../service/service.type'

export type TypeCurrentServiceExample = TypeCurrentService['examples'][0]

export type TypeExample = ExamplesQuery['examples']['examples'][0]
export type TypeExampleReview = NonNullable<TypeExample['review']>


