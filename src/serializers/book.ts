// ----------------------------------------------------------------
// Purpose:
// This library implements the Book serializers.
// ----------------------------------------------------------------

import { Serialized } from '../interfaces/serialized'

import { SerializedPerson } from './person'
import { SerializedChapter } from './chapter'
import { SerializedTopic } from './topic'
import { SerializedText } from './text'

export interface SerializedBook extends Serialized {
    Title?: SerializedText
    Subtitle?: SerializedText
    Chapters?: Array<SerializedChapter>
    Authors?: Array<SerializedPerson>
    Foreword?: Array<SerializedText>
    Afterword?: Array<SerializedText>
    Acknowledgements?: Array<SerializedText>
    Legal?: Array<SerializedText>
    Topics?: Array<SerializedTopic>
}
