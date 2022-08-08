// ----------------------------------------------------------------
// Purpose:
// This library implements the Chapter interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'
import { SerializedStory } from './Story'

export interface SerializedChapter extends Serialized {
    Title?: SerializedText
    Introduction?: Array<SerializedText>
    Stories?: Array<SerializedStory>
    Conclusion?: Array<SerializedText>
    Topics?: Array<SerializedTopic>
}
