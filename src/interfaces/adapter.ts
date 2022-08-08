// ----------------------------------------------------------------
// Purpose:
// This class implements the Adapter interface.
// ----------------------------------------------------------------

import { Language } from '../enums/language'

import { Model } from './model'
import { Product } from './product'

export interface Adapter {
    adapt(product: Product, model: Model): void
}
