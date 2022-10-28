// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Typeface interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedTypeface extends Serialized {
    Title?: string
    Cover?: string
    Normal?: string
    Console?: string
    Bold?: string
    Italic?: string
}
