// ----------------------------------------------------------------
// Purpose:
// This library implements the Typeface interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedTypeface extends Serialized {
    Cover?: string
    Normal?: string
    Bold?: string
    Italic?: string
}