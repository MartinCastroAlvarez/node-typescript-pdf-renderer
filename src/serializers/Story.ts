// ----------------------------------------------------------------
// Purpose:
// This library implements the Story interface.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedSource } from './Source'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'

export interface SerializedStory extends Serialized {
    Title?: SerializedText
    Blocks?: Array<Serialized>
    Topics?: Array<SerializedTopic>
    Sources?: Array<SerializedSource>
}
