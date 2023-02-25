// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Story interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedSource } from './Source'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'

export interface SerializedStory extends Serialized {
    Title?: SerializedText
    Items?: Array<Serialized>
    Topics?: Array<SerializedTopic>
    Sources?: Array<SerializedSource>
}
