// ----------------------------------------------------------------
// Purpose:
// This library implements the Source serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedPerson } from './person'
import { SerializedImage } from './image'
import { SerializedText } from './text'

export interface SerializedSource extends Serialized {
    Title?: SerializedText
    Authors?: Array<SerializedPerson>
    Avatar?: SerializedImage
}
