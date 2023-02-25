// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Text interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedText extends Serialized {
    ALL?: string
    EN?: string
    ES?: string
}
