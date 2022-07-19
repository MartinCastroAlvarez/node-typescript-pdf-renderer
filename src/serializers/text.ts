// ----------------------------------------------------------------
// Purpose:
// This library implements the Text interface.
// ----------------------------------------------------------------

import { Serializable } from './base'
import { Language } from '../utils/language'

export interface SerializedText extends Serializable {
    Language.EN?: string
    Language.ES?: string
}
