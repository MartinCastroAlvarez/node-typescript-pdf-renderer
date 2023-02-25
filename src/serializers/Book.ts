// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Book serializers.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/Serialized'

import { SerializedChapter } from './Chapter'
import { SerializedPerson } from './Person'
import { SerializedText } from './Text'
import { SerializedTopic } from './Topic'
import { SerializedEdition } from './Edition'

export interface SerializedBook extends Serialized {
    Title?: SerializedText
    Subtitle?: SerializedText
    Audience?: Array<SerializedText>
    Prerequisites?: Array<SerializedText>
    Goal?: Array<SerializedText>
    Chapters?: Array<SerializedChapter>
    Authors?: Array<SerializedPerson>
    Foreword?: Array<Serialized>
    Afterword?: Array<Serialized>
    Acknowledgements?: Array<SerializedText>
    Legal?: Array<SerializedText>
    Editions?: Array<SerializedEdition>
    Topics?: Array<SerializedTopic>
}
