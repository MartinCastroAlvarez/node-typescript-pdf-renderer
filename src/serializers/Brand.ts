// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Brand interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedText } from './Text'
import { SerializedImage } from './Image'
import { SerializedPerson } from './Person'

export interface SerializedBrand extends Serialized {
    Title?: SerializedText
    Icon?: SerializedText
    Avatar?: SerializedImage
    Authors?: Array<SerializedPerson>
}
