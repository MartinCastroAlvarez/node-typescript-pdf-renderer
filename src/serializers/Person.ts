// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Person serialiser.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
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
