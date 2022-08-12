// ----------------------------------------------------------------
// Purpose:
// This library implements the Source serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedImage } from './Image'
import { SerializedPerson } from './Person'
import { SerializedText } from './Text'

export interface SerializedSource extends Serialized {
    Title?: SerializedText
    Link?: SerializedText
    Authors?: Array<SerializedPerson>
    Avatar?: SerializedImage
}
