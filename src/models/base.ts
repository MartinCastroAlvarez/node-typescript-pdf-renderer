// ----------------------------------------------------------------
// Purpose:
// This library defines the Model interface that must be
// implemented by other classes in this directory.
// ----------------------------------------------------------------

import { Serializable } from '../serializers/base'

export interface Model {
    toJson() : Serializable
    toString() : string
    fromJson(data: Serializable) : void
}
