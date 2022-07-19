// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter interface.
// ----------------------------------------------------------------

import { Serialized } from './base'
import { SerializedText } from './text'
import { SerializedStory } from './story'

export interface SerializedChapter extends Serialized {
    Title: SerializedText
    Introduction: Array<Serialized>
    Stories: Array<SerializedStory>
    Conclusion: Array<Serialized>
}
