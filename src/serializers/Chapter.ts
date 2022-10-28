// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Chapter interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedStory } from './Story'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'

export interface SerializedChapter extends Serialized {
    Title?: SerializedText
    Summary?: SerializedText
    Stories?: Array<SerializedStory>
    Topics?: Array<SerializedTopic>
}
