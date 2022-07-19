// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

import { Serialized } from '../serializers/base'

export interface Model {
    toJson(): Serialized
    toString(): string
    fromJson(data: Serialized): void
}
