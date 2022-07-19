// ----------------------------------------------------------------
// Purpose:
// This library implements the Author serializer.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedImage } from './image'

export interface SerializedAuthor extends Serialized {
    Name?: string
    Website?: string
    Email?: string
    Logo?: SerializedImage
}
