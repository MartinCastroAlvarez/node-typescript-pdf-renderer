// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from './base'

export interface SerializedFile extends Serialized {
    Path?: string
}
