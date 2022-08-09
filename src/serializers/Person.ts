// ----------------------------------------------------------------
// Purpose:
// This library implements the Person serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedImage } from './Image'
import { SerializedText } from './Text'

export interface SerializedPerson extends Serialized {
    Name?: SerializedText
    Website?: SerializedText
    Bio?: SerializedText
    Email?: SerializedText
    Avatar?: SerializedImage
}
