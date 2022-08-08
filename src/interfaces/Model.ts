// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface.
// ----------------------------------------------------------------

import { Serialized } from './Serialized'

export interface Model {
    serialize(): Serialized
    toString(): string
    unserialize(data: Serialized): void
}
