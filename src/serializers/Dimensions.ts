// ----------------------------------------------------------------
// Purpose:
// This library implements the Dimensions interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedDimensions extends Serialized {
    Normal?: number
    Small?: number
    Title?: number
    Subtitle?: number
    Margin?: number
    Break?: number
}
