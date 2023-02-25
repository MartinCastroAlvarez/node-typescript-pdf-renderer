// ----------------------------------------------------------------

import { Model } from './Model'

export interface Adapter {
    toString(): string
    apply(): void
}

export interface DividableAdapter extends Adapter {
    getHeight(): number
    isTooLarge(): boolean
    addBreak(): void
}

export interface ModelAdapter extends Adapter {
    getModel(): Model
    setModel(model: Model)
}
