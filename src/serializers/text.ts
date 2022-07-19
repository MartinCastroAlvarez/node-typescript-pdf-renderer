// ----------------------------------------------------------------
// Purpose:
// This library implements the Text interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedSource } from './source'
import { Language } from '../utils/language'

export interface SerializedText extends Serialized {
    EN?: string
    ES?: string
    Source?: SerializedSource
}
