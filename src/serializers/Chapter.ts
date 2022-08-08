// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedStory } from './Story'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'

export interface SerializedChapter extends Serialized {
    Title?: SerializedText
    Introduction?: Array<SerializedText>
    Stories?: Array<SerializedStory>
    Conclusion?: Array<SerializedText>
    Topics?: Array<SerializedTopic>
}
