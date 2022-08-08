// ----------------------------------------------------------------
// Purpose:
// This library implements the Story interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedTopic } from './Topic'
import { SerializedText } from './Text'
import { SerializedSource } from './source'

export interface SerializedStory extends Serialized {
    Title?: SerializedText
    Blocks?: Array<Serialized>
    Topics?: Array<SerializedTopic>
    Sources?: Array<SerializedSource>
}
