// ----------------------------------------------------------------
// Purpose:
// This library implements the Source serializer.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedPerson } from './person'
import { SerializedImage } from './image'

export interface SerializedSource extends Serialized {
    Title?: string
    Authors?: Array<SerializedPerson>
    Logo?: SerializedImage
}
