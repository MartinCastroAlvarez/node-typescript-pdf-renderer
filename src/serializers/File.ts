// ----------------------------------------------------------------
// PURPOSE:
// This library implements the File interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedFile extends Serialized {
    Path?: string
}
