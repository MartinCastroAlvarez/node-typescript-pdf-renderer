// ----------------------------------------------------------------
// Purpose:
// This library implements the List interface.
// ----------------------------------------------------------------

import { Serializable } from './base'
import { SerializedText } from './text'

export interface SerializedList extends Serializable {
    items: Array<SerializedText>
}
