// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Definition interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedText } from './Text'

export interface SerializedDefinition extends Serialized {
    Title?: SerializedText
    Description?: SerializedText
}
