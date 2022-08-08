// ----------------------------------------------------------------
// Purpose:
// This library implements the Person serializer.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedImage } from './image'
import { SerializedText } from './text'

export interface SerializedPerson extends Serialized {
    Name?: SerializedText
    Website?: SerializedText
    Email?: SerializedText
    Avatar?: SerializedImage
}
