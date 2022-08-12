// ----------------------------------------------------------------
//

import { Feature } from './Feature'

import { Model } from './Model'

export interface Adapter extends Feature {
    getModel(): Model
    setModel(model: Model): void
}
