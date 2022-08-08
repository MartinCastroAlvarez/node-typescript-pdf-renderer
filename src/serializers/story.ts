// ----------------------------------------------------------------
// Purpose:
// This library implements the Story interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedTopic } from './topic'
import { SerializedText } from './text'
import { SerializedSource } from './source'

export interface SerializedStory extends Serialized {
    Title?: SerializedText
    Blocks?: Array<Serialized>
    Topics?: Array<SerializedTopic>
    Sources?: Array<SerializedSource>
}
