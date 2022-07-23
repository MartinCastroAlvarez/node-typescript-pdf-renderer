// ----------------------------------------------------------------
// Purpose:
// This library implements the Pallete interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

export interface SerializedPallete extends Serialized {
    Primary?: string
    Secondary?: string
    White?: string
    Black?: string
    Grey?: string
}
