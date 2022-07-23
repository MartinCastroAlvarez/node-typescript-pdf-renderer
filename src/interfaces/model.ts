// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface.
// ----------------------------------------------------------------

import { Serialized } from './serialized'

export interface Model {
    serialize(): Serialized
    toString(): string
    unserialize(data: Serialized): void
}
