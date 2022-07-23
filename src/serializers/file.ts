// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

export interface SerializedFile extends Serialized {
    Path?: string
}
