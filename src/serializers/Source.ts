// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Source serialiser.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedImage } from './Image'
import { SerializedPerson } from './Person'
import { SerializedText } from './Text'

export interface SerializedSource extends Serialized {
    Title?: SerializedText
    Link?: SerializedText
    Year?: number
    Authors?: Array<SerializedPerson>
    Avatar?: SerializedImage
}
