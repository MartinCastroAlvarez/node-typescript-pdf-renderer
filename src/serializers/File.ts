// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

export interface SerializedFile extends Serialized {
    Path?: string
}
