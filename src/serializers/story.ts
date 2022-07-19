// ----------------------------------------------------------------
// Purpose:
// This library implements the Story interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedText } from './text'

export interface SerializedStory extends Serialized {
    Title: SerializedText
    Blocks: Array<Serialized>
}
