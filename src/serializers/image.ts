// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from './base'

export interface SerializedImage extends Serialized {
    Path?: string
    Width?: number
    Height?: number
    Left?: number
    Right?: number
    Top?: number
    Bottom?: number
}
