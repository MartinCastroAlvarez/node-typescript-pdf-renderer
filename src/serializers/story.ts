// ----------------------------------------------------------------
// Purpose:
// This library implements the Story interface.
// ----------------------------------------------------------------

import { Serializable } from './base'
import { SerializedText } from './text'

export interface SerializedStory extends Serializable {
    title: SerializedText
    blocks: Array<Serializable>
}
