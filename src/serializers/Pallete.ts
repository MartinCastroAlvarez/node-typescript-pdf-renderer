// ----------------------------------------------------------------
// Purpose:
// This library implements the Pallete interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedPallete extends Serialized {
    Primary?: string
    Secondary?: string
    White?: string
    Black?: string
    Grey?: string
}
