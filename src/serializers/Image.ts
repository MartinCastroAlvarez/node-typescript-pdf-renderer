// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Image interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { SerializedFile } from './File'
import { SerializedText } from './Text'

export interface SerializedImage extends SerializedFile {
    Orientation?: String
    Legend?: SerializedText
}
