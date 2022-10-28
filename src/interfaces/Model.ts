// ----------------------------------------------------------------
// PURPOSE:
// This library defines the Model interface.
// ----------------------------------------------------------------

import { Serialized } from './Serialized'

export interface Model {
    build(): Promise<void>
    serialise(): Serialized
    toString(): string
    deserialise(data: Serialized): void
}

export interface NumberedModel extends Model {
    title: Model
    number: Model
}
