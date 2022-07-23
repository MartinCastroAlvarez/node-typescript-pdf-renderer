// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedText } from './text'
import { SerializedTopic } from './topic'
import { SerializedStory } from './story'

export interface SerializedChapter extends Serialized {
    Title?: SerializedText
    Introduction?: Array<Serialized>
    Stories?: Array<SerializedStory>
    Conclusion?: Array<Serialized>
    Topics?: Array<SerializedTopic>
}
