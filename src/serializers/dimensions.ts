// ----------------------------------------------------------------
// Purpose:
// This library implements the Dimensions interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

export interface SerializedDimensions extends Serialized {
    Normal?: number
    Title?: number
    Subtitle?: number
}
