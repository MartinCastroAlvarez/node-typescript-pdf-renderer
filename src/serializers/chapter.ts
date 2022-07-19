// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter interface.
// ----------------------------------------------------------------

import { Serializable } from './base'
import { SerializedText } from './text'
import { SerializedStory } from './story'

export interface SerializedChapter extends Serializable {
    title: SerializedText
    introduction: Array<Serializable>
    stories: Array<SerializedStory>
    conclusion: Array<Serializable>
}
