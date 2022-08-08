// ----------------------------------------------------------------
// Purpose:
// This library implements the Source serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedPerson } from './person'
import { SerializedImage } from './Image'
import { SerializedText } from './Text'

export interface SerializedSource extends Serialized {
    Title?: SerializedText
    Authors?: Array<SerializedPerson>
    Avatar?: SerializedImage
}
