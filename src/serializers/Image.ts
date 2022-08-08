// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedImage extends Serialized {
    Path?: string
    Width?: number
    Height?: number
    Left?: number
    Right?: number
    Top?: number
    Bottom?: number
}
