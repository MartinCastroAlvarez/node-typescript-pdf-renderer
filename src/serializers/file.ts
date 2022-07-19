// ----------------------------------------------------------------
// Purpose:
// This library implements the File interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { Language } from '../utils/language'

export interface SerializedFile extends Serialized {
    Path?: string
}
