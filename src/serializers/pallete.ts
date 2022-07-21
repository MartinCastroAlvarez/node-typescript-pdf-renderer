// ----------------------------------------------------------------
// Purpose:
// This library implements the Pallete interface.
// ----------------------------------------------------------------

import { Serialized } from './base'

export interface SerializedPallete extends Serialized {
    Primary: string
    Secondary: string
    White: string
    Black: string
    Grey: string
}
