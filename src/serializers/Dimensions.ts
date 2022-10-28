// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Dimensions interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedDimensions extends Serialized {
    Small?: number
    Normal?: number
    Title?: number
    Heading1?: number
    Heading2?: number
    Heading3?: number
    Heading4?: number
    Avatar?: number
    Margin?: number
    Padding?: number
}
