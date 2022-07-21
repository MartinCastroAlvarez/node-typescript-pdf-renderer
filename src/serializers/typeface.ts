// ----------------------------------------------------------------
// Purpose:
// This library implements the Typeface interface.
// ----------------------------------------------------------------

import { Serialized } from './base'

export interface SerializedTypeface extends Serialized {
    Normal: string
    Bold: string
    Italic: string
}
