// ----------------------------------------------------------------
// Purpose:
// This library implements the Author serializer.
// ----------------------------------------------------------------

import { Serializable } from './base'

export interface SerializedAuthor extends Serializable {
    name?: string
    website?: string
    email?: string
}
