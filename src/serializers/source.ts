// ----------------------------------------------------------------
// Purpose:
// This library implements the Source serializer.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedAuthor } from './author'
import { SerializedImage } from './image'

export interface SerializedSource extends Serialized {
    Title?: string
    Authors?: Array<SerializedAuthor>
    Logo?: SerializedImage
}
